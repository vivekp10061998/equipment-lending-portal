import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut, ShieldCheck } from "lucide-react";
import { getCurrentUser, logoutUser } from "../services/storageService";

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brandIcon">
          <ShieldCheck size={22} />
        </span>
        <span>EquipLend</span>
      </Link>

      <nav className="navLinks">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/equipment">Equipment</NavLink>
        <NavLink to="/requests">Requests</NavLink>
        {user?.role === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}
      </nav>

      <div className="navRight">
        {user && (
          <span className="userChip">
            {user.name} · {user.role}
          </span>
        )}

        <button className="iconButton mobileOnly">
          <Menu size={20} />
        </button>

        {user && (
          <button className="logoutBtn" onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;