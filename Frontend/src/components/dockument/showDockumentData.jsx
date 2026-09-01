import { useDockument } from "../../hooks/saveDataHook";

function ShowDockumentData() {
  const { dockumentData } = useDockument();

  const templateTrue =
    dockumentData?.template?.length > 0 ? "Template är vald." : "Ej vald";

  const fileTrue =
    dockumentData?.file?.length > 0 ? dockumentData.file : "Ej uppladat";
  return (
    <div className="p-2 w-full">
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
  );
}

export default ShowDockumentData;
