import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other fallback UI
  }

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;
