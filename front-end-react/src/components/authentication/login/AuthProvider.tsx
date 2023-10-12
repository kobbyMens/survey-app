import { useState } from "react";
import AuthContext from "../../../context/authContext";

interface AuthProviderType {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderType) {
  let [user, setUser] = useState<any>(null);

  let value = { user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
