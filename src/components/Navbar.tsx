import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Navbar = () => {
  const auth = useAuth();

  const handleLogout = () => {
    const redirectUri = window.location.origin;
    const clientId = "6g9i83psniun5oe6h65lvs10nm"; // replace with actual Cognito client ID

    const logoutUrl = `https://smartorderpro.auth.ap-south-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${redirectUri}`;

    window.location.href = logoutUrl;
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-3 shadow">
      <Link to="/" className="text-2xl font-bold text-white">
        Home
      </Link>
      <div className="flex items-center space-x-4">
        {auth.isAuthenticated ? (
          <>
            <span className="text-sm">👋 {auth.user?.profile?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => auth.signinRedirect()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;







