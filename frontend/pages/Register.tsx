import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    await api.post("/api/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
