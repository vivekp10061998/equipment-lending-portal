import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";

import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Requests from "./pages/Requests";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { getCurrentUser } from "./services/storageService";

import "./App.css";

function ProtectedLayout({ children, adminOnly = false }) {
  const user = getCurrentUser();
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      {isPageLoading ? <PageLoader /> : children}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
          <ProtectedLayout adminOnly>
            <AdminPanel />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;