import React, { useState } from "react";
import Login from "./Login";

export default function LoginForm({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Login">
      <div>
        <span>login</span>
        <input
          autoFocus
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <span>password</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <Login login={login} email={email} password={password} />
    </div>
  );
}
