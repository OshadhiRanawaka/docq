import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/ChatConversation.css";

// ── Mock data — replace with real API calls when backend is ready ──
const MOCK_CHATS = {
  1: {
    id: 1,
    title: "Untitled chat",
    documentName: "2024_25 Jan Intale_Final Exam.pdf",
    messages: [
      {
        id: 1,
        role: "user",
        content: "What is this document about",
      },
      {
        id: 2,
        role: "assistant",
        content: `The document is a past exam paper for the **CMs1o6 Computational Mathematics** module (May 2025). It consists of:

- **page 1** – Cover page and exam instructions (duration, weighting, allowed stationery, etc.).
- **pages 2–4** – Four exam questions (total 25 marks each) covering topics such as:
  - Rational numbers, set theory, and logical propositions.
  - Relations, functions, and combinatorial counting (arrangements, selections).
  - Limits, integration, and area calculations.
  - Matrix determinant, inverse, solving linear systems, and vector angle computation.
- **page 5** – Formula sheet provided for the exam.
- **page 6** – Additional notes on integration and the matrix inverse formula.

Overall, the paper tests a range of computational-mathematics concepts that students in the BSc (Hons) Artificial Intelligence and Data Science programme are expected to master.`,
      },
    ],
  },
};

// Simple markdown-like renderer for bold text and bullet lists
function renderContent(text) {
  const lines = text.split("\n");
  const elements = [];
  let keyCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === "") {
      elements.push(<br key={keyCounter++} />);
      continue;
    }

    // Bullet point lines
    if (line.trim().startsWith("- ")) {
      const content = line.trim().slice(2);
      elements.push(
        <li key={keyCounter++}>{parseBold(content)}</li>
      );
      continue;
    }

    // Sub-bullet (starts with spaces then -)
    if (line.match(/^\s{2,}- /)) {
      const content = line.trim().slice(2);
      elements.push(
        <li key={keyCounter++} className="sub-bullet">{parseBold(content)}</li>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={keyCounter++}>{parseBold(line)}</p>
    );
  }

  return elements;
}

// Parse **bold** text inline
function parseBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function ChatConversation() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  // Load mock chat — replace with API call later
  const chat = MOCK_CHATS[Number(chatId)] || MOCK_CHATS[1];

  const [messages, setMessages] = useState(chat.messages);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea as user types
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isSending) return;

    // Add user message immediately
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setIsSending(true);

    // Simulate AI response — replace this timeout with real API call later:
    // const { data } = await sendMessage(chatId, text)
    // setMessages(prev => [...prev, data.assistant_message])
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "This is a mock response. Connect the backend to get real AI answers based on your document.",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsSending(false);
    }, 1200);
  };

  // Send on Enter, new line on Shift+Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = inputValue.length;

  return (
    <div className="chat-conv-container">
      <Sidebar activePage="chats" />

      <main className="chat-conv-main">

        {/* ── Top bar ── */}
        <div className="chat-conv-topbar">
          <button
            className="chat-conv-back-btn"
            onClick={() => navigate("/chats")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            all chats
          </button>

          <div className="chat-conv-doc-badge">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>{chat.documentName}</span>
          </div>
        </div>

        {/* ── Messages area ── */}
        <div className="chat-conv-messages">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {/* Typing indicator */}
          {isSending && (
            <div className="chat-conv-typing">
              <div className="chat-conv-ai-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </div>
              <div className="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input area ── */}
        <div className="chat-conv-input-area">

          {/* Model label row */}
          <div className="chat-conv-model-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
            <span className="chat-conv-model-name">GPT O5S 120b</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <polyline points="18 13 12 19 6 13" />
            </svg>
            <span className="chat-conv-model-divider">|</span>
          </div>

          {/* Textarea + send */}
          <div className="chat-conv-input-wrap">
            <textarea
              ref={textareaRef}
              className="chat-conv-textarea"
              placeholder={`Ask any question about your document '${chat.documentName}'`}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isSending}
            />
            <button
              className="chat-conv-send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending}
              title="Send"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <p className="chat-conv-char-count">{charCount} characters</p>
        </div>

      </main>
    </div>
  );
}

/* ── Single message bubble ── */
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`chat-conv-msg-row ${isUser ? "user-row" : "ai-row"}`}>

      {/* Avatar */}
      <div className={`chat-conv-avatar ${isUser ? "user-avatar" : "ai-avatar"}`}>
        {isUser ? (
          <span>O</span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div className={`chat-conv-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
        <div className="chat-conv-bubble-content">
          {isUser ? (
            <p>{msg.content}</p>
          ) : (
            <div className="ai-content">{renderContent(msg.content)}</div>
          )}
        </div>

        {/* Action icons — only on AI messages */}
        {!isUser && (
          <div className="chat-conv-msg-actions">
            <button onClick={handleCopy} title={copied ? "Copied!" : "Copy"}>
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
            <button title="Good response">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </button>
            <button title="Bad response">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
            </button>
            <button title="More options">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatConversation;
