import React from "react";
import { useContext, useState, useEffect } from "react"; // 3 types of hooks used
import { useHistory } from "react-router-dom";

import { auth } from "../Firebase";

// context created which is empty at initial
const AuthContext = React.createContext(); 

//useContext hook accepts the value provided by React.createContext and then re-render the component whenever its value changes (performance can be optimized by memoization)
export const useAuth = () => useContext(AuthContext); 

//managing  the users data and  React children will render all JSX passed to Auth provider

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);         //loading as per action of user and  state changes
  const [user, setUser] = useState(null);                // setting user with empty object or null
  const history = useHistory();                         //navigating to user history
   
  // useful sideeffect generated
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
     if (user) history.push("/chats");             //if user is there => chats
    })
  }, [user, history]); //re-rendering / loading occurs only when user or history values changes

  const value = { user };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}              {/*if not loading then show the childrens */}
    </AuthContext.Provider>
  );
};
