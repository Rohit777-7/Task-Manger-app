import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={submit}>LOGIN</button>

        <div className="auth-footer">
          Secure Task Manager • Built with ❤️
        </div>
      </div>
    </div>
  );
}
