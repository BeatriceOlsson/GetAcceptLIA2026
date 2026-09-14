import { useCallback, useRef, useState } from "react";
import FetchBackend from "../components/fetchBackend";
import { ContactHandelerContext } from "./ContactHandlerContext";

export function ContactHandlerProvider({ children }) {
  const [userList, setUserList] = useState([]);
  const [respons, setRespons] = useState([]);
  const alredyGottenDataref = useRef(false);

  const uppdateUserList = useCallback(async () => {
    if (alredyGottenDataref.curent || userList.length > 0) {
      return;
    }

    try {
      alredyGottenDataref.current = true;

      const res = await FetchBackend({
        url: `/userData`,
      });

      if (res instanceof Error) {
        alredyGottenDataref.current = false;
        throw new Error("Kunde inte hämta kontakt");
      }

      const data = Array.isArray(res?.data) ? res.data : [];

      setUserList(data);
      setRespons(data);
    } catch (error) {
      console.error("Användare kunde inte hittas", error);
      setUserList([]);
      setRespons([]);
    }
  }, []);

  const addUserToArray = useCallback((user) => {
    setUserList((prev) => {
      const formation = {
        userEmail: user.email,
        userMobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return [...prev, formation];
    });
  }, []);

  const seartchUserLoop = useCallback(
    (seartchLetters) => {
      const value = seartchLetters.trim();

      if (!value || value.length < 2) {
        setRespons([]);
        return;
      }

      const timeoutId = setTimeout(async () => {
        const userMatching = userList.filter((user) => {
          return user.userEmail.toLowerCase().includes(value);
        });

        setRespons(userMatching);
      }, 600);

      return () => clearTimeout(timeoutId);
    },
    [userList],
  );

  const sendAllUser = useCallback(() => {
    setRespons(userList);
  });

  const data = {
    respons,
    seartchUserLoop,
    uppdateUserList,
    addUserToArray,
    sendAllUser,
  };

  return (
    <ContactHandelerContext.Provider value={data}>
      {children}
    </ContactHandelerContext.Provider>
  );
}
