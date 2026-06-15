import "../styles/Chats.css";
import Sidebar from "../components/Sidebar";
import SearchIcon from "../assets/search.svg";
import { useState } from "react";

function Chats() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="chats-container">
      <Sidebar activePage="chats" />
      <main className="chats-main">
        <div className="chats-topbar">
          <div className="chats-topbar-left">
            <h1 className="chats-title">Chats</h1>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chats;
