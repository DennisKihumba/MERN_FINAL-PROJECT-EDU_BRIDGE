import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">EduBridge</h1>
        <div>
          {token ? (
            <>
              <Link to="/" className="mr-4 hover:underline">Forum</Link>
              <Link to="/resources" className="mr-4 hover:underline">Resources</Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
