import { useState } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Forum from "./pages/Forum";
import ThreadDetails from "./pages/ThreadDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResourceList from "./pages/Resources/ResourceList";
import ResourceUpload from "./pages/Resources/ResourceUpload";
import ResourceDetails from "./pages/Resources/ResourceDetails";

function App() {
  // ✅ Use state to track token
  const [token, setToken] = useState(localStorage.getItem("token"));

  const activeClass = "bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow";
  const inactiveClass = "text-white hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold transition";

  // ✅ Function to handle login and update token state
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">EduBridge Forum</h1>
          <div className="flex items-center gap-2">
            {token ? (
              <>
                <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Forum</NavLink>
                <NavLink to="/resources" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Resources</NavLink>
                <NavLink to="/resources/upload" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Upload</NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Login</NavLink>
                <NavLink to="/register" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Register</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={token ? <Forum /> : <Navigate to="/login" />} />
          <Route path="/thread/:id" element={token ? <ThreadDetails /> : <Navigate to="/login" />} />
          
          {/* Resources */}
          <Route path="/resources" element={token ? <ResourceList /> : <Navigate to="/login" />} />
          <Route path="/resources/upload" element={token ? <ResourceUpload /> : <Navigate to="/login" />} />
          <Route path="/resources/:id" element={token ? <ResourceDetails /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
