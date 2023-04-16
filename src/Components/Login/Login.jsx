import React, { useRef, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();
  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    console.log(email, password);
    // Validate password
    setError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (!loggedUser.emailVerified) {
          alert("please verify your email");
        }
        setSuccess("Login successful");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        // console.error(error);
      });
  };

  const handleResetPassword = () => {
    // console.log(emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide your email address");
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Please Check your email inbox").catch((error) => {
        // console.log(error);
        setError(error.message);
      });
    });
  };
  return (
    <div className="mx-auto w-50">
      <h2 className="mt-5 text-primary">Please Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control p-3 rounded mb-2"
            id="email"
            name="email"
            ref={emailRef}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={visiblePassword ? "text" : "password"}
            className="form-control p-3 rounded mb-2"
            id="password"
            name="password"
            placeholder="Enter password"
            required
          />
          <input
            onClick={handleVisiblePassword}
            type="checkbox"
            name="checkbox"
            id="checkbox"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>
        <small>
          Forgot Password?{" "}
          <button className="btn btn-link " onClick={handleResetPassword}>
            Reset Password
          </button>
        </small>
      </p>
      <p>
        <small>
          New to this website? <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
