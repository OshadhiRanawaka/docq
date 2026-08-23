import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Account.css";

// Mock user data — replace with real Supabase call when backend is ready
const MOCK_USER = {
  displayName: "xxTxxSKULLxx",
  email: "xxtxxskullxx2007@gmail.com",
  avatarColor: "#e11d48",
  avatarInitial: "O",
  plan: "Community",
};

const PLAN_FEATURES_LEFT = [
  "20 documents upload / month",
  "20 prompts / day",
  "20 free credits / month **",
  "3 desks / 1 workspace",
  "100 MB storage ***",
];

const PLAN_FEATURES_RIGHT = [
  "120 pages per document",
  "Math documents (100 pages max) *",
  "2 workspaces max",
  "50 MB per document",
  "Share links",
];

function Account() {
  const [displayName, setDisplayName] = useState(MOCK_USER.displayName);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(MOCK_USER.displayName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const handleNameSave = () => {
    setDisplayName(tempName);
    setEditingName(false);
    setSaveMsg("Saved!");
    setTimeout(() => setSaveMsg(""), 2000);
    // TODO: replace with real API call → await updateProfile({ displayName: tempName })
  };

  const handleNameCancel = () => {
    setTempName(displayName);
    setEditingName(false);
  };

  return (
    <div className="account-container">
      <Sidebar activePage="" />

      <main className="account-main">
        {/* ── Scroll wrapper ── */}
        <div className="account-scroll">

          {/* ── Back / close icon top right ── */}
          <div className="account-topbar">
            <button className="account-close-btn" title="Back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="account-body">
            <h1 className="account-page-title">Account</h1>

            {/* ════════════ PROFILE SECTION ════════════ */}
            <section className="account-section">
              <h2 className="account-section-title">Profile</h2>

              <div className="account-card">

                {/* Avatar row */}
                <div className="profile-avatar-row">
                  <div
                    className="profile-avatar"
                    style={{ background: MOCK_USER.avatarColor }}
                  >
                    {MOCK_USER.avatarInitial}
                  </div>
                  <div className="profile-avatar-info">
                    <p className="profile-avatar-name">{displayName}</p>
                    <p className="profile-avatar-email">{MOCK_USER.email}</p>
                  </div>
                </div>

                {/* Display name field */}
                <div className="account-field">
                  <label className="account-field-label">Display name</label>
                  <div className="account-field-body">
                    {editingName ? (
                      <div className="account-field-edit">
                        <input
                          className="account-input"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          autoFocus
                        />
                        <div className="account-field-edit-actions">
                          <button
                            className="btn-save"
                            onClick={handleNameSave}
                          >
                            Save
                          </button>
                          <button
                            className="btn-cancel-edit"
                            onClick={handleNameCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="account-field-display">
                        <input
                          className="account-input"
                          value={displayName}
                          readOnly
                          onClick={() => {
                            setTempName(displayName);
                            setEditingName(true);
                          }}
                        />
                        {saveMsg && (
                          <span className="save-msg">{saveMsg}</span>
                        )}
                      </div>
                    )}
                    <p className="account-field-hint">
                      Shown on your profile and in messages. Saved automatically.
                    </p>
                  </div>
                </div>

                {/* Email field */}
                <div className="account-field">
                  <label className="account-field-label">Email</label>
                  <div className="account-field-body">
                    <div className="account-field-row">
                      <input
                        className="account-input"
                        value={MOCK_USER.email}
                        readOnly
                      />
                      <button className="btn-change">Change…</button>
                    </div>
                    <p className="account-field-hint">
                      Used to sign in and receive notifications.
                    </p>
                  </div>
                </div>

                {/* Password field */}
                <div className="account-field account-field--last">
                  <label className="account-field-label">Password</label>
                  <div className="account-field-body">
                    <div className="account-field-row">
                      <input
                        className="account-input"
                        type="password"
                        value="placeholder"
                        readOnly
                      />
                      <button className="btn-change">Change…</button>
                    </div>
                    <p className="account-field-hint">
                      Required when signing in with email + password.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* ════════════ PLAN SECTION ════════════ */}
            <section className="account-section">
              <h2 className="account-section-title">Plan</h2>

              <div className="plan-card">
                <p className="plan-name">Community</p>
                <div className="plan-features-grid">
                  <ul className="plan-features-col">
                    {PLAN_FEATURES_LEFT.map((f) => (
                      <li key={f}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ul className="plan-features-col">
                    {PLAN_FEATURES_RIGHT.map((f) => (
                      <li key={f}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ════════════ DANGER ZONE ════════════ */}
            <section className="account-section">
              <h2 className="account-section-title danger-title">
                Danger Zone
              </h2>

              <div className="account-card danger-card">
                <div className="danger-row">
                  <div>
                    <p className="danger-label">Delete account</p>
                    <p className="danger-desc">
                      Permanently delete your account and all data. This cannot
                      be undone.
                    </p>
                  </div>
                  <button
                    className="btn-delete-account"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* ── Delete confirmation modal ── */}
        {showDeleteConfirm && (
          <div
            className="confirm-overlay"
            onClick={(e) =>
              e.target === e.currentTarget && setShowDeleteConfirm(false)
            }
          >
            <div className="confirm-modal">
              <h3>Delete your account?</h3>
              <p>
                This will permanently delete your account and all your
                documents and chats. This cannot be undone.
              </p>
              <div className="confirm-actions">
                <button
                  className="btn-cancel-edit"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button className="btn-delete-account">
                  Yes, delete my account
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Account;
