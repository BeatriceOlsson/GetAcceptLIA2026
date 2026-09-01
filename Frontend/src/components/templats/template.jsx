export function TemplateBox({ template, selected, onSelected }) {
  const imageUrl =
    template?.thumb_url || template?.thumbnail_url || template?.image_url || "";

  return (
    <li
      className={`border-2 bg-white rounded-lg hover:bg-gray-500 hover:text-orange-400 w-60 h-96 flex flex-col justify-between overflow-hidden shadow-lg cursor-pointer transition-all ${
        selected ? "border-orange-600 scale-105" : "bg-white  border-gray-700"
      }`}
      onClick={onSelected}
    >
      <div className="flex-1 min-h-0 w-full flex items-center justify-center bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={template?.name || "Template bild"}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-sm text-gray-500 p-4 text-center">
            Ingen bild
          </div>
        )}
      </div>
      <div className="p-2 flex flex-col gap-0.5">
        <h2 className="font-semibold">
          {template?.name || "Namnlöst template"}
        </h2>
        <p className="text-sm">{template?.sender_name || "Okänt avsändare"}</p>
        <p className="text-sm">
          {template?.created_at
            ? new Date(template.created_at).toLocaleDateString("sv-SE")
            : "Datum saknas"}
        </p>
      </div>
    </li>
  );
}
