import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Auth.css";

function Auth() {
  const [mode, setMode] = useState("login"); // login | signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (mode === "signup") {
        const name = e.target.name.value;
        const role = e.target.role.value;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // store minimal user data locally
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: userCredential.user.uid,
            name,
            email,
            role,
          })
        );

        alert("Account created successfully");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // keep role simple for now (can be fetched later)
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: userCredential.user.uid,
            email,
            role: "student",
          })
        );

        alert("Login successful");
      }
    } catch (error) {
      alert(error.message);
    }
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
              type="button"
            >
              Login
            </button>
            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>

            {mode === "signup" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            {mode === "signup" && (
              <select name="role" required>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="supplier">Lab / Industry</option>
              </select>
            )}

            <button type="submit" className="auth-btn">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="auth-footer">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setMode("login")}>
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Auth;
