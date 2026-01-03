import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Auth.css";

function Auth() {
  const [mode, setMode] = useState("login"); // login | signup

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${mode === "login" ? "Logged in" : "Account created"} (mock)`);
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          {/* TOGGLE */}
          <div className="auth-toggle">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>

            {mode === "signup" && (
              <input type="text" placeholder="Full Name" required />
            )}

            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            {mode === "signup" && (
              <select required>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="lab">Lab / Industry</option>
              </select>
            )}

            <button type="submit" className="auth-btn">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* FOOTER TEXT */}
          <p className="auth-footer">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setMode("signup")}>Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setMode("login")}>Login</span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Auth;
