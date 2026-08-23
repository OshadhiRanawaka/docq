import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadModal from "../components/UploadModal";
import SearchIcon from "../assets/search.svg";
import HomeIcon from "../assets/home-icon.svg";
import "../styles/Documents.css";

function Documents() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUploadSuccess = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setShowUploadModal(false);
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setSelectedIds((prev) => prev.filter((s) => s !== id));
    setOpenMenuId(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === documents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(documents.map((d) => d.id));
    }
  };

  const allSelected =
    documents.length > 0 && selectedIds.length === documents.length;

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="docs-container">
      <Sidebar activePage="documents" />

      <main className="docs-main">

        {/* ── Top bar: title left, search + add right ── */}
        <div className="docs-topbar">
          <div className="docs-topbar-left">
            <h1 className="docs-title">Documents</h1>
            {documents.length > 0 && (
              <p className="docs-subtitle">
                You have {documents.length} document
                {documents.length !== 1 ? "s" : ""} in this workspace.
              </p>
            )}
          </div>

          <div className="docs-topbar-right">
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
              className="btn-add"
              onClick={() => setShowUploadModal(true)}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
              Add
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="docs-content">
          {documents.length === 0 ? (
            /* ── Empty state ── */
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <img src={HomeIcon} alt="No documents" />
              </div>
              <h2 className="empty-title">Welcome to docAnalyzer!</h2>
              <p className="empty-subtitle-text">
                There are no documents in this workspace yet.
              </p>
              <p className="empty-desc">
                Add, view, and control your documents from here.
              </p>
              <button
                className="btn-add-doc"
                onClick={() => setShowUploadModal(true)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                + Add document
              </button>
            </div>
          ) : (
            /* ── Document list ── */
            <div className="doc-list-card">
              {/* Controls row */}
              <div className="doc-list-controls">
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                  <span>Select all</span>
                </label>
                <div className="doc-filters">
                  <span className="filter-created">
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
                    Created
                  </span>
                  <select className="filter-select">
                    <option>Page</option>
                    <option>Name</option>
                    <option>Size</option>
                  </select>
                  <select className="filter-select">
                    <option>Date</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
              </div>

              {/* Rows */}
              {filteredDocuments.length === 0 && searchQuery ? (
                <p className="doc-no-results">
                  No documents match "{searchQuery}"
                </p>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`doc-row${selectedIds.includes(doc.id) ? " doc-row--selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="doc-check"
                      checked={selectedIds.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                    />

                    {/* PDF icon */}
                    <svg
                      className="doc-file-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>

                    <span className="doc-name">{doc.name}</span>

                    {/* New Chat button */}
                    <button
                      className="btn-new-chat"
                      onClick={() => navigate("/chats")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      New Chat
                    </button>

                    {/* Info icon */}
                    <button className="doc-icon-btn" title="Document info">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </button>

                    {/* Page count */}
                    <span className="doc-pages">{doc.pages || "—"}</span>

                    {/* Three-dot menu */}
                    <div className="doc-menu-wrap">
                      <button
                        className="doc-icon-btn"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === doc.id ? null : doc.id,
                          )
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
                      {openMenuId === doc.id && (
                        <div className="doc-dropdown">
                          <button
                            className="doc-dropdown-item doc-dropdown-item--danger"
                            onClick={() => handleDelete(doc.id)}
                          >
                            Delete
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

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
export default Documents;

  // const handleAddDocument = () => {
  //   setShowUploadModal(true);
  // };

  // const handleUploadSuccess = (data) => {
  //   setShowUploadModal(false);
  //   setDocuments([...documents, data]);
  // };

  //   return (
  //     <div className="home-container">
  //       <Sidebar />
  //       <main className="home-main">
  //         <header className="home-header">
  //           <h1>Documents</h1>
  //           <div className="search-bar">
  //             <img src={SearchIcon} alt="Search" className="search-icon" />
  //             <input type="text" placeholder="Search documents..." />
  //           </div>
  //         </header>

  //         <div className="documents-content">
  //           {documents.length === 0 ? (
  //             <div className="empty-state">
  //               <div className="empty-icon">
  //                 <img src={HomeIcon} alt="No documents" />
  //               </div>
  //               <h2>Welcome to docAnalyzer!</h2>
  //               <p className="empty-subtitle">
  //                 There are no documents in this workspace yet.
  //               </p>
  //               <p className="empty-description">
  //                 Add, view, and organize your documents together.
  //               </p>
  //               <button className="add-document-btn" onClick={handleAddDocument}>
  //                 + Add Document
  //               </button>
  //             </div>
  //           ) : (
  //             <div className="documents-grid">
  //               {/* Documents will be displayed here */}
  //             </div>
  //           )}
  //         </div>

  //         {showUploadModal && (
  //           <UploadModal
  //             onClose={() => setShowUploadModal(false)}
  //             onSuccess={handleUploadSuccess}
  //           />
  //         )}
  //       </main>
  //     </div>
  //   );



