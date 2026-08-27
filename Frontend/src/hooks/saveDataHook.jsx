import { useContext } from "react";
import { SaveDataContext } from "../context/savedDataContext";

export function useDockument() {
  const context = useContext(SaveDataContext);
  return context;
}
