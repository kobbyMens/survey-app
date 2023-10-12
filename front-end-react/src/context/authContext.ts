import { createContext } from "react";

interface AuthContextType {
  user: string;
  setUser: (user: any) => any;
}

let AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
