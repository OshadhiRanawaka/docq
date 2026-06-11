//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import Logo from "../assets/logo-icon.svg.svg";
import Google from "../assets/google-logo.svg";
import Microsoft from "../assets/microsoft-logo.svg";
import Apple from "../assets/ios-logo.svg";

function SignIn() {
  const navigate = useNavigate();
  //   const [email, setEmail] = useState("");
  //   const [verifying, setVerifying] = useState(false);
  // const [error, setError] = useState("");

  //   const handleEmailSubmit = (e) => {
  //     e.preventDefault();
  //     if (!email) return;
  //     setError("");
  //     setVerifying(true);
  //     // TODO: hook up real auth
  //    try {
  //   // TODO: replace this URL with your real auth API endpoint
  //   const res = await fetch("https://your-api.com/auth/send-otp", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   });

  //   if (!res.ok) throw new Error("Failed to send verification email.");

  //   // TODO: navigate to OTP / check-email screen
  //   console.log("Verification email sent to", email);

  // } catch (err) {
  //   setError(err.message || "Something went wrong. Please try again.");
  //   setVerifying(false);
  // }
  //   };

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
        <button className="nav-signin-btn" onClick={() => navigate('/documents')}>Documents</button>
        <button className="nav-signin-btn" onClick={() => navigate('/signup')}>Sign Up</button>

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

          <h1 className="signin-title">Sign in to DocQ</h1>
          <p className="signin-subtitle">Ask your documents anything</p>
          <p className="signin-note">
            Continue via Google, Microsoft, or Apple for{" "}
            <strong>AI For Verticals</strong> , maker of docAnalyzer.
          </p>

          <div className="social-buttons">
            <button className="social-btn google">
              <img src={Google} alt="google-icon" width="18" height="18" />
              Continue with Google
            </button>
            <button className="social-btn microsoft">
              <img src={Microsoft} alt="google-icon" width="18" height="18" />
              Continue with Microsoft
            </button>
            <button className="social-btn apple">
              <img src={Apple} alt="google-icon" width="18" height="18" />
              Continue with Apple
            </button>
          </div>

          <div className="or-divider">
            <span> OR USE EMAIL</span>
          </div>

          {/* onSubmit={handleEmailSubmit}*/}
          <form>
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

export default SignIn;
