from fastapi import APIRouter, HTTPException, Depends, status
from supabase import create_client
from pydantic import BaseModel
from dotenv import load_dotenv
from gotrue.types import User
from typing import Any, Dict, List, Optional
from auth import get_current_user
import uuid
import os

load_dotenv()

router = APIRouter()

SUPABASE_URL: Optional[str] = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY: Optional[str] = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL is not set in environment variables.")
if not SUPABASE_SERVICE_KEY:
    raise RuntimeError("SUPABASE_SERVICE_KEY is not set in environment variables.")

assert SUPABASE_URL is not None and SUPABASE_SERVICE_KEY is not None
supabase: Any = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


class SendMessageRequest(BaseModel):
    content: str


# ── GET /chats/{chat_id}/messages ──────────────────────────────
@router.get("/{chat_id}/messages", response_model=None)
async def get_messages(
    chat_id: str,
    user: User = Depends(get_current_user),
) -> Dict[str, Any]:

    try:
        chat_response: Any = (
            supabase.table("chats")
            .select("*, documents(filename)")
            .eq("chat_id", chat_id)
            .eq("user_id", user.id)
            .single()
            .execute()
        )
        chat_data = getattr(chat_response, "data", None)
        if not isinstance(chat_data, dict):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found.",
            )
        chat: Dict[str, Any] = chat_data

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    try:
        msg_response: Any = (
            supabase.table("messages")
            .select("*")
            .eq("chat_id", chat_id)
            .order("created_at", desc=False)
            .execute()
        )

        doc: Optional[Dict[str, Any]] = chat.pop("documents", None)
        if isinstance(doc, dict):
            chat["document_filename"] = doc.get("filename", "Unknown")
        else:
            chat["document_filename"] = "Unknown"

        raw_messages = getattr(msg_response, "data", None) or []
        messages: List[Dict[str, Any]] = raw_messages if isinstance(raw_messages, list) else []

        return {
            "chat": chat,
            "messages": messages,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch messages: {str(e)}",
        )


# ── POST /chats/{chat_id}/messages ─────────────────────────────
@router.post("/{chat_id}/messages", response_model=None)
async def send_message(
    chat_id: str,
    body: SendMessageRequest,
    user: User = Depends(get_current_user),
) -> Dict[str, Any]:

    # Verify chat belongs to this user
    try:
        chat_response: Any = (
            supabase.table("chats")
            .select("*, documents(filename, document_id)")
            .eq("chat_id", chat_id)
            .eq("user_id", user.id)
            .single()
            .execute()
        )
        chat_data = getattr(chat_response, "data", None)
        if not isinstance(chat_data, dict):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found.",
            )
        chat: Dict[str, Any] = chat_data

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    # Check user has credits
    try:
        profile_response: Any = (
            supabase.table("profiles")
            .select("credits_remaining")
            .eq("id", user.id)
            .single()
            .execute()
        )
        profile_data = getattr(profile_response, "data", None)
        if not isinstance(profile_data, dict):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found.",
            )

        credits_remaining_raw = profile_data.get("credits_remaining")
        if not isinstance(credits_remaining_raw, int):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="User profile is invalid.",
            )

        credits_remaining: int = credits_remaining_raw

        if credits_remaining <= 0:
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                detail="No credits remaining. Please upgrade your plan.",
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    # Get existing message history for context
    history_response: Any = (
        supabase.table("messages")
        .select("role, content")
        .eq("chat_id", chat_id)
        .order("created_at", desc=False)
        .execute()
    )
    history_raw = getattr(history_response, "data", None) or []
    history: List[Dict[str, Any]] = history_raw if isinstance(history_raw, list) else []

    # Save user message
    user_message: Dict[str, Any] = {
        "message_id": str(uuid.uuid4()),
        "chat_id":    chat_id,
        "role":       "user",
        "content":    body.content,
    }
    supabase.table("messages").insert(user_message).execute()

    # Extract document_id safely
    documents_data = chat.get("documents")
    if isinstance(documents_data, dict):
        document_id: str = str(documents_data.get("document_id", ""))
    else:
        document_id = ""

    # Call AI backend (placeholder until AI team is ready)
    ai_answer: str = await _get_ai_response(
        question=body.content,
        document_id=document_id,
        user_id=str(user.id),
        chat_history=history,
    )

    # Save AI response
    ai_message: Dict[str, Any] = {
        "message_id": str(uuid.uuid4()),
        "chat_id":    chat_id,
        "role":       "assistant",
        "content":    ai_answer,
    }
    supabase.table("messages").insert(ai_message).execute()

    # Deduct 1 credit
    supabase.table("profiles").update(
        {"credits_remaining": credits_remaining - 1}
    ).eq("id", user.id).execute()

    return {
        "user_message":      user_message,
        "assistant_message": ai_message,
    }


async def _get_ai_response(
    question: str,
    document_id: str,
    user_id: str,
    chat_history: List[Dict[str, Any]],
) -> str:
    """
    Calls the AI backend RAG pipeline.
    Returns a placeholder response until the AI backend is ready.
    """
    ai_url: str = os.getenv("AI_BACKEND_URL", "http://localhost:8001")

    try:
        import httpx
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{ai_url}/query",
                json={
                    "question":     question,
                    "document_id":  document_id,
                    "user_id":      user_id,
                    "chat_history": chat_history,
                },
            )
            if response.status_code == 200:
                result: Any = response.json()
                answer: str = result.get("answer", "No answer returned.")
                return answer

    except Exception:
        pass

    return (
        "The AI backend is still under development. "
        "Your question has been saved and will be answered "
        "once the AI service is connected."
    )
