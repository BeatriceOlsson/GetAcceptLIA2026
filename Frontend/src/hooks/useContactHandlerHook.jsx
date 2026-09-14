import { useContext } from "react";
import { ContactHandelerContext } from "../context/ContactHandlerContext";

export function useContactHandeler() {
  const context = useContext(ContactHandelerContext);

  return context;
}
