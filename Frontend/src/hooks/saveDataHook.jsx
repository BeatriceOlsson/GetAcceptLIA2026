import { useContext } from "react";
import { SaveDataContext } from "../context/savedDataContext";

export function useDockument() {
  const context = useContext(SaveDataContext);

  if (!context) {
    throw new Error("useDockument must be used inside SaveDataProvider");
  }

  return context;
}
