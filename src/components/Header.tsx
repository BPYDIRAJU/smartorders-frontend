import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Header = () => {
  const auth = useAuth();

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Home</h1>
      <nav className="space-x-4">
        <Link to="/">View Orders</Link>
        <Link to="/add">Add New Order</Link>
        {auth.isAuthenticated && (
          <button
            onClick={() => auth.signoutRedirect()}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;




