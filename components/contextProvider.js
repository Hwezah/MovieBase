"use client";
import { createContext, useContext, useState } from "react";
const StateContext = createContext();

function StateContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <StateContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </StateContext.Provider>
  );
}
function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a ReservationProvider",
    );
  }
  return context;
}

export { StateContextProvider, useStateContext };
