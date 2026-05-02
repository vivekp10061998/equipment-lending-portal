import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { registerUser } from "../services/storageService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="loginPage">
      <section className="loginHero">
        <div className="heroBadge">Create Account</div>
        <h1>Join the equipment lending system.</h1>
        <p>
          Students and staff can create accounts and request equipment from the portal.
        </p>
      </section>

      <section className="loginCard">
        <div className="loginIcon">
          <UserPlus size={34} />
        </div>

        <h2>Register</h2>
        <p className="muted">Create a frontend-only user account.</p>

        {error && <div className="errorBox">{error}</div>}

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create password"
          />

          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="STUDENT">Student</option>
            <option value="STAFF">Staff</option>
          </select>

          <button className="primaryBtn fullWidth" type="submit">
            Create Account
          </button>
        </form>

        <p className="authSwitch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;