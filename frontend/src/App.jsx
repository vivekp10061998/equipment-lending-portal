import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Requests from "./pages/Requests";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import "./App.css";

function ProtectedLayout({ children }) {
  const user = localStorage.getItem("elpUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/equipment"
        element={
          <ProtectedLayout>
            <Equipment />
          </ProtectedLayout>
        }
      />

      <Route
        path="/requests"
        element={
          <ProtectedLayout>
            <Requests />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedLayout>
            <AdminPanel />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;