import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import Logo from "../assets/logo-icon.svg.svg";
import DocumentsIcon from "../assets/documents-icon.svg";
import ChatIcon from "../assets/chat-icon.svg";
import HelpIcon from "../assets/help-icon.svg";
import credit from "../assets/credits-icon.svg";

function Sidebar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("documents");

  const menuItems = [
    { id: "documents", label: "Documents", icon: DocumentsIcon, path: "/documents" },
    { id: "chat", label: "Chats", icon: ChatIcon, path: "/chats" },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    navigate(item.path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={Logo} alt="DocQ Logo" className="logo-img" />
          <span className="logo-text">docAnalyzer.ai</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-menu-item ${activeMenu === item.id ? "active" : ""}`}
            onClick={() => handleMenuClick(item)}
          >
            <img src={item.icon} alt={item.label} className="menu-icon" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-menu-item help-btn">
          <img src={HelpIcon} alt="Help" className="menu-icon" />
          <span>Help</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">O</div>
          <div className="user-info">
            <p className="user-name">xxTxxSKULLxx</p>
            <div className="user-credits">
              <img className="credit-icon" src={credit} alt="Credit" />
              <span>20 credits</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
