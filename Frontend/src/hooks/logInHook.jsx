import { useContext } from "react";
import { LogdInContext } from "../context/logedInContext";

export function useLogdIn() {
  const context = useContext(LogdInContext);

  if (!context) {
    throw new Error("useLogdIn must be used inside LogdInProvider");
  }

  return context;
}
