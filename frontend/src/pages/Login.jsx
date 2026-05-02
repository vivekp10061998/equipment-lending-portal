import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { loginUser } from "../services/storageService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "student@school.com",
    password: "student123",
    role: "STUDENT"
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;

    const demoCredentials = {
      STUDENT: {
        email: "student@school.com",
        password: "student123"
      },
      STAFF: {
        email: "staff@school.com",
        password: "staff123"
      },
      ADMIN: {
        email: "admin@school.com",
        password: "admin123"
      }
    };

    setForm({
      role,
      email: demoCredentials[role].email,
      password: demoCredentials[role].password
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    try {
      loginUser(form.email, form.password, form.role);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="loginPage">
      <section className="loginHero">
        <div className="heroBadge">Full Stack Assignment</div>
        <h1>Smart Equipment Lending Portal</h1>
        <p>
          Login as student, staff, or admin and manage real frontend data using localStorage.
        </p>

        <div className="demoBox">
          <strong>Demo Credentials</strong>
          <p>Student: student@school.com / student123</p>
          <p>Staff: staff@school.com / staff123</p>
          <p>Admin: admin@school.com / admin123</p>
        </div>
      </section>

      <section className="loginCard">
        <div className="loginIcon">
          <ShieldCheck size={34} />
        </div>

        <h2>Login</h2>
        <p className="muted">Use demo credentials or registered account.</p>

        {error && <div className="errorBox">{error}</div>}

        <form onSubmit={handleLogin}>
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleRoleChange}>
            <option value="STUDENT">Student</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>

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
            placeholder="Enter password"
          />

          <button className="primaryBtn fullWidth" type="submit">
            Login
          </button>
        </form>

        <p className="authSwitch">
          New user? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;