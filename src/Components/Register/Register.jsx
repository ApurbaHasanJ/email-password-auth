import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  };

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
        <input className="w-50 p-3 mb-4 rounded"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="your email"
        />
        <br />
        <input className="w-50 p-3 mb-4 rounded"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="your password"
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
