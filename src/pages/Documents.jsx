import { useState } from "react";
import "../styles/Home.css";
import Sidebar from "../components/Sidebar";
import UploadModal from "../components/UploadModal";
import SearchIcon from "../assets/search.svg";
import HomeIcon from "../assets/home-icon.svg";

function Home() {
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleAddDocument = () => {
    setShowUploadModal(true);
  };

  const handleUploadSuccess = (data) => {
    setShowUploadModal(false);
    setDocuments([...documents, data]);
  };

  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-main">
        <header className="home-header">
          <h1>Documents</h1>
          <div className="search-bar">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input type="text" placeholder="Search documents..." />
          </div>
        </header>

        <div className="documents-content">
          {documents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <img src={HomeIcon} alt="No documents" />
              </div>
              <h2>Welcome to docAnalyzer!</h2>
              <p className="empty-subtitle">
                There are no documents in this workspace yet.
              </p>
              <p className="empty-description">
                Add, view, and organize your documents together.
              </p>
              <button className="add-document-btn" onClick={handleAddDocument}>
                + Add Document
              </button>
            </div>
          ) : (
            <div className="documents-grid">
              {/* Documents will be displayed here */}
            </div>
          )}
        </div>

        {showUploadModal && (
          <UploadModal
            onClose={() => setShowUploadModal(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default Home;
