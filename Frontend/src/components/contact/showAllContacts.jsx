import { useEffect } from "react";
import { useContactHandeler } from "../../hooks/useContactHandlerHook";
import { BigPopUppWindow } from "../smalComponents/biggPopUppWindow";
import { LoadingHandling } from "../smalComponents/loadingHandling";
import { SelectedContact } from "./selectedContacts";
import { BlueButton } from "../smalComponents/blueButton";
import { useDockument } from "../../hooks/saveDataHook";

export function ShowAllContacts({ showPopUpp = false, onClose }) {
  const { uppdateUserList, respons } = useContactHandeler();
  const { saveRecipient } = useDockument();

  useEffect(() => {
    if (showPopUpp && respons.length === 0) {
      uppdateUserList();
    }
  }, [showPopUpp, uppdateUserList, respons]);

  return (
    <BigPopUppWindow
      isOpen={showPopUpp}
      title="Kontakter"
      content={
        <div className="flex flex-col items-center gap-3 cursor-pointer">
          {respons.length > 0 ? (
            <div>
              <SelectedContact
                data={respons}
                className={`inline-flex flex-col m-1`}
                onSelectedContact={(person) => {
                  saveRecipient?.(person);
                }}
              />
            </div>
          ) : (
            <LoadingHandling />
          )}
          <div>
            <BlueButton
              buttonText="Stäng"
              buttonClick={onClose ?? (() => {})}
              className="w-24 h-9"
            />
          </div>
        </div>
      }
    />
  );
}
