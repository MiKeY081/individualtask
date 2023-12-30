import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get("/home").then((res) => setUser(res.data.user));
  },[]);
  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
};
export default UserContext;
