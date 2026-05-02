import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");

  const handleLogin = (event) => {
    event.preventDefault();

    const user = {
      name: role === "ADMIN" ? "Admin User" : "Student User",
      role
    };

    localStorage.setItem("elpUser", JSON.stringify(user));
    navigate("/");
  };

  return (
    <main className="loginPage">
      <section className="loginHero">
        <div className="heroBadge">Full Stack Assignment</div>
        <h1>Smart Equipment Lending Portal</h1>
        <p>
          A modern school equipment borrowing system for students, staff, and administrators.
        </p>
      </section>

      <section className="loginCard">
        <div className="loginIcon">
          <ShieldCheck size={34} />
        </div>

        <h2>Welcome Back</h2>
        <p className="muted">Choose a role and continue to the portal.</p>

        <form onSubmit={handleLogin}>
          <label>Name</label>
          <input type="text" value={role === "ADMIN" ? "Admin User" : "Student User"} readOnly />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="STUDENT">Student</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="primaryBtn fullWidth" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;