import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/api/auth/register", form);
      // navigate to login after successful registration
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h1>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit}>REGISTER</button>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <small>
            Already have an account? <a href="/login">Login</a>
          </small>
        </div>

        <div className="auth-footer">Secure Task Manager • Built with ❤️</div>
      </div>
    </div>
  );
}
