import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-icon.svg.svg";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="signin-page">
      <nav className="signin-nav">
        <div className="signin-logo">
          <div className="logo-icon">
            <img
              width="20"
              height="20"
              viewBox=" 0 0 24 24"
              src={Logo}
              alt="logo-icon"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </div>
          <span>DocQ</span>
        </div>
        <button className="nav-signin-btn" onClick={() => navigate("/")}>
          Sign In
        </button>
      </nav>

      <main className=" signin-main">
        <div className="signin-card">
          <div className="card-logo">
            <div className="logo-icon large">
              <img
                src={Logo}
                alt="logo-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </div>
          </div>

          <h1 className="signin-title">Sign Up for DocQ</h1>
          <p className="signin-subtitle">Ask your documents anything</p>
          <p className="signin-note">
            Sign Up for <strong>AI For Verticals</strong> , maker of
            docAnalyzer.
          </p>

          {/* onSubmit={handleEmailSubmit}*/}
          <form>
            <label className="email-label">
              Display Name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="email-input"
              placeholder="xxTxxSKULLxx"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />

            <label className="email-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              className="email-input"
              placeholder="you@example.com"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />

            <label className="email-label">
              Create Password <span className="required">*</span>
            </label>
            <input
              type="password"
              className="email-input"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />

            <label className="email-label">
              Re-enter Password <span className="required">*</span>
            </label>
            <input
              type="password"
              className="email-input"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />

            {/* {error && <p className="email-error">{error}</p>} */}
            {/* {verifying && (
                  <div className="verifying-row">
                    <div className="spinner" />
                    <span>Verifying...</span>
                  </div>
                )}

                {!verifying && email && (
                  <button type="submit" className="continue-btn">
                    Continue
                  </button>
                )} */}
          </form>

          <div className="signin-footer">
            <a href="#">Privacy</a>
            <span>.</span>
            <a href="#">Terms</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
