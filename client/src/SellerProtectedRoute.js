import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isSeller, children }) => {
  if (!isSeller) {
    return <Navigate to={`/shop`} replace />;
  }

  return children;
};

export default ProtectedRoute;
