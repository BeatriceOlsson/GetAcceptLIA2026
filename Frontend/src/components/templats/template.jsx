export function TemplateBox({ template, selected, onSelected }) {
  const imageUrl =
    template?.thumb_url || template?.thumbnail_url || template?.image_url || "";

  return (
    <li
      className={`border-4 border-blue-900 w-60 h-96 flex flex-col justify-between overflow-hidden shadow-lg cursor-pointer transition-all ${
        selected ? "border-green-500 bg-green-50/30 scale-102" : "bg-white"
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
