import { useDockument } from "../../hooks/saveDataHook";

function ShowDockumentData({ dockumentSent = false }) {
  const { dockumentData } = useDockument();

  const templateTrue =
    dockumentData?.template_title?.length > 0
      ? dockumentData.template_title
      : "Ej vald";

  const fileTrue =
    dockumentData?.file_name?.length > 0
      ? dockumentData.file_name
      : "Ej uppladat";

  return (
    <>
      {dockumentSent === false ? (
        <div className="p-2 w-full min-h-[240px]">
          <p className="w-ful break-words">
            Dockument namn:
            <br />
            {dockumentData?.name}
          </p>
          <p>
            Värdet:
            <br />
            {dockumentData?.value}
          </p>
          <p>
            Vald Template:
            <br />
            {templateTrue}
          </p>
          <p>
            Uppladat fil:
            <br />
            {fileTrue}
          </p>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <b>Dockument namn:</b>
                </th>
                <td>
                  <p>{dockumentData?.name}</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>
                  <b>Värdet:</b>
                </th>
                <td>
                  <p>{dockumentData?.value}</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>
                  <b>Vald Template:</b>
                </th>
                <td>
                  <p>{templateTrue}</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>
                  <b>Uppladat fil:</b>
                </th>
                <td>
                  <p>{fileTrue}</p>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </>
  );
}

export default ShowDockumentData;
