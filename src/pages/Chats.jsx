import "../styles/Chats.css";
import Sidebar from "../components/Sidebar";
import SearchIcon from "../assets/search.svg";

function Chats() {
  return (
    <div className="chats-container">
      <Sidebar />
      <main className="chats-main">
        <header className="chats-header">
          <h1>Chats</h1>
          <div className="search-bar">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input type="text" placeholder="Search chats..." />
          </div>
        </header>
      </main>
    </div>
  );
}

export default Chats;
