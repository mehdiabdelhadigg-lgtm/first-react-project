import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("currentUser") ?{email:localStorage.getItem("currentUser")}  :  null);

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "User already exists" };
    }
    const newuser = { email, password };

    users.push(newuser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser",email);

    setUser({ email });
    return { success: true, message: "User created successfully" };
  }

  function logout(){
    localStorage.removeItem("currentUser");
    setUser(null);
    
  }
  function login(email,password){
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find((u) => u.email === email && u.password === password)) {
            setUser({ email });
            localStorage.setItem("currentUser",email);
            return { success: true, message: "Login successful" };
          } else {
            return { success: false, message: "Invalid email or password" };
          }
        }

  

  return (
    <AuthContext.Provider value={{ signUp, user,logout, login }}>

      {children}
    </AuthContext.Provider> 
  );
}
