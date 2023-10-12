import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

interface AuthType {
  children: React.ReactNode;
}

function RequiredAuth({ children }: AuthType) {
  let location = useLocation();
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

export default RequiredAuth;
