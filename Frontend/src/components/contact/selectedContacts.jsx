import { useDockument } from "../../hooks/saveDataHook";
import { BlueButton } from "../smalComponents/blueButton";

export function SelectedContact({
  className = "",
  dockumentSent = false,
  data = [],
  onSelectedContact = false,
}) {
  const { dockumentData, removeRecipient, uppdateRecipientRole } =
    useDockument();
  const recipient =
    data.length > 0 ? data : dockumentData ? dockumentData.recipients : [];
  const recipiensAddedToList =
    dockumentData.recipients.map((r) => r.userEmail) || [];

  return (
    <div className="">
      {recipient.length === 0 ? (
        <p></p>
      ) : (
        recipient.map((person, index) => {
          const curentEmail = person.userEmail;
          const isSelected =
            !!onSelectedContact && recipiensAddedToList.includes(curentEmail);
          return (
            <ul
              key={`${person.userEmail ?? person.email ?? "recipient"}-${index}`}
              className={`border-2 border-gray-700 rounded-lg shadow-lg flex flex-row w-52 h-25 p-1 ml-1 mb-2 relative ${className} ${
                isSelected
                  ? "border-orange-600 scale-105"
                  : "bg-white  border-gray-700"
              }`}
              onClick={() => {
                if (onSelectedContact) {
                  onSelectedContact(person);
                }
              }}
            >
              <li>
                {dockumentSent === false && (
                  <>
                    <BlueButton
                      buttonText={"x"}
                      buttonClick={() =>
                        removeRecipient(
                          person.userEmail ?? person.email ?? person,
                        )
                      }
                      className="text-1xl right-1 m-1 absolute w-5 h-auto"
                    />
                  </>
                )}
                <h3 className="text-l m-0.5">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="m-0.5">{person.userEmail ?? person.email}</p>
                {dockumentSent === false ? (
                  <select
                    name="role"
                    id={`role-${index}`}
                    className="border-2 border-gray-700 rounded-lg hover:bg-gray-500 hover:text-orange-400 curs"
                    value={person.role || "signer"}
                    onChange={(e) =>
                      uppdateRecipientRole(
                        person.userEmail ?? person.email ?? person,
                        e.target.value,
                      )
                    }
                  >
                    <option value="signer">Signerare</option>
                    <option value="internalApprover">Intern godkännare</option>
                    <option value="externalApprover">Extern godkännare</option>
                    <option value="cc">Läsare</option>
                  </select>
                ) : (
                  <div className="pl-1">
                    {(() => {
                      switch (person.role) {
                        case "signer":
                          return <p>Signerare</p>;
                        case "internalApprover":
                          return <p>Intern godkännare</p>;
                        case "externalApprover":
                          return <p>Extern godkännare</p>;
                        case "cc":
                          return <p>Läsare</p>;
                        default:
                          return <p>Loding...</p>;
                      }
                    })()}
                  </div>
                )}
              </li>
            </ul>
          );
        })
      )}
    </div>
  );
}
