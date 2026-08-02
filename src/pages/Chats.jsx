import "../styles/Chats.css";
import Sidebar from "../components/Sidebar";
import SearchIcon from "../assets/search.svg";
import NewChatIcon from "../assets/newChat- icon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_CHATS = [
  {
    id: 1,
    title: "Untitles chat",
    documentName: "024_S2_IntroFinal_FinalExam.pdf",
    updatedAt: "2 min ago",
  },
];

function Chats() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState(MOCK_CHATS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredChats = chats.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const allSelected =
    filteredChats.length > 0 && selectedIds.length === filteredChats.length;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredChats.map((c) => c.id));
    }
  };

  const handleDelete = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    setSelectedIds((prev) => prev.filter((s) => s !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="chats-container">
      <Sidebar activePage="chats" />
      <main className="chats-main">
        <div className="chats-topbar">
          <div className="chats-topbar-left">
            <h1 className="chats-title">Chats</h1>
            {chats.length > 0 && (
              <p className="chats-subtitle">
                You have {chats.length} chat{chats.length !== 1 ? "s" : ""} in
                this workspace.
              </p>
            )}
          </div>

          <div className="chats-topbar-right">
            <div className="search-bar">
              <img src={SearchIcon} alt="Search" className="search-icon" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="btn-new-chat"
              onClick={() => navigate("/documents")}
            >
              <img src={NewChatIcon} alt="New Chat" className="search-icon" />
              New Chat
            </button>
          </div>
        </div>

        {/* // Content */}
        <div className="chats-content">
          {chats.length === 0 ? (
            <div className="chats-empty">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="chats-empty-title">No chats yet</p>
              <p className="chats-empty-desc">
                Upload a document and click "New Chat" to get started.
              </p>
            </div>
          ) : (
            <div className="chats-list-card">
              {/* ── Controls row: select all + updated label + search ── */}
              <div className="chats-controls">
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                  <span>Select All</span>
                </label>
                <div className="chats-controls-right">
                  <span className="filter-updated">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Updated
                  </span>
                </div>
              </div>

              {/* ── Chat rows ── */}

              {filteredChats.length === 0 ? (
                <p className="chats-no-results">
                  No chats match "{searchQuery}"
                </p>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                   className={`chat-row${selectedIds.includes(chat.id) ? " chat-row--selected" : ""}`}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      className="chat-check"
                      checked={selectedIds.includes(chat.id)}
                      onChange={() => toggleSelect(chat.id)}
                    />

                    {/* Chat bubble icon */}
                    <svg
                      className="chat-row-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>

                    {/* Title */}
                    <span className="chat-row-title">{chat.title}</span>

                    {/* Open Chat button */}
                    <button
                      className="btn-open-chat"
                      onClick={() => navigate(`/chat/${chat.id}`)}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open Chat
                    </button>

                    {/* Document badge */}
                    <div className="chat-doc-badge">
                      <svg
                        width="12"
                        height="12"
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

                    {/* Three-dot menu */}
                    <div className="chat-menu-wrap">
                      <button
                        className="chat-icon-btn"
                        onClick={() =>
                          setOpenMenuId(openMenuId === chat.id ? null : chat.id)
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#6b7280"
                        >
                          <circle cx="12" cy="5" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="12" cy="19" r="1.5" />
                        </svg>
                      </button>
                      {openMenuId === chat.id && (
                        <div className="chat-dropdown">
                          <button className="chat-dropdown-item chat-dropdown-item--danger"
                            onClick={() => handleDelete(chat.id)}
                          >
                            Delete Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Chats;
