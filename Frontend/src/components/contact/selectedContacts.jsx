import { useDockument } from "../../hooks/saveDataHook";
import { BlueButton } from "../smalComponents/blueButton";

export function SelectedContact() {
  const { dockumentData, removeRecipient, uppdateRecipientRole } =
    useDockument();
  const recipient = dockumentData ? dockumentData.recipients : [];

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-2xl">Mottagare</h3>
      {recipient.length === 0 ? (
        <p>Ingen motagare vald</p>
      ) : (
        recipient.map((person, index) => (
          <ul
            key={`${person.userEmail ?? person.email ?? "recipient"}-${index}`}
            className="border-4 border-blue-900 rounded-sm flex flex-row w-64 h-25 p-1 relative"
          >
            <li>
              <BlueButton
                buttonText={"x"}
                buttonClick={() =>
                  removeRecipient(person.userEmail ?? person.email ?? person)
                }
                className="text-1xl right-0 m-1 absolute w-6 h-auto"
              />
              <h3 className="text-l m-0.5">
                {person.firstName} {person.lastName}
              </h3>
              <p className="m-0.5">{person.userEmail ?? person.email}</p>
              <select
                name="role"
                id={`role-${index}`}
                className="border-4 border-blue-900 rounded-sm"
                value={person.role || "Signer"}
                onChange={(e) =>
                  uppdateRecipientRole(
                    person.userEmail ?? person.email ?? person,
                    e.target.value,
                  )
                }
              >
                <option value="Signer">Signerare</option>
                <option value="internalApprover">Intern godkännare</option>
                <option value="externalApprover">Extern godkännare</option>
                <option value="cc">Läsare</option>
              </select>
            </li>
          </ul>
        ))
      )}
    </div>
  );
}
