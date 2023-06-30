import React, { createContext, useContext, useReducer } from "react";

export const AdminContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <AdminContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AdminContext.Provider>
);

export const useStateValue = () => useContext(AdminContext);