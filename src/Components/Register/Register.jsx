import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();

  const handleRegistration = (event) => {
    setSuccess("");
    setError('')
    // 1. prevent pase refresh
    event.preventDefault();
    // 2. collect from data
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    console.log(name, email, password);

    // validate email and password
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one upper case letter");
      return;
    }
    else if (!/(?=.*[0-9].*[0-9])/.test(password)){
      setError("Please add at least two numbers");
      return;
    }
    else if (password.length < 6){
      setError('Please add at least 6 characters in the password');
      return;

    }
    // if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
    //   setError("please add at least two upper case letters");
    //   return;
    // } else if (!/(?=.*[!@#$&*])/.test(password)) {
    //   setError("please add at least one special character in the password");
    //   return;
    // } else if (password.length < 6) {
    //   setError("password must be at least 6 characters");
    //   return;
    // }
    console.log(email, password);

    // 3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setError("");
        event.target.reset();
        setSuccess("user created successfully");
        console.log(loggedUser);
        sendVerificationEmail(result.user)
        updateUserData(result.user, name)
      })
      .catch((error) => {
        setError(error.message);

        console.error(error.message);
      });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user)
    .then(result => {
      console.log(result);
      alert('Verification email sent')
    })

      
    }
    const updateUserData = (user,name) => {
      updateProfile(user, {
        displayName: name
      })
      .then(()=> {
        console.log("user name updated");
      })
      .catch(error => {
        // console.log(error.message);
        setError(error.message);
      })

  }
  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };
  return (
    <div className="mx-auto w-75">
      <h2 className="mt-5 text-primary">Please Register</h2>
      <form onSubmit={handleRegistration}>
        <input
          className="w-50 p-3 mb-4 rounded"
          type="text"
          name="name"
          id="name"
          placeholder="your name"
          required
        />
        <br />
        <input
          className="w-50 p-3 mb-4 rounded"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="your email"
          required
        />
        <br />
        <input
          className="w-50 p-3 mb-4 rounded"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="your password"
          required
        />
        <br />
        <p><small>Already have an account?<Link to="/login">Login</Link></small></p>
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
