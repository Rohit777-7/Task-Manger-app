import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2>Task Manager</h2>
      <button onClick={logout} style={styles.btn}>Logout</button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff"
  },
  btn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ff6b81",
    color: "#fff",
    cursor: "pointer"
  }
};
