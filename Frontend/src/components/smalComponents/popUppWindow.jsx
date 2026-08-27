export function PopUppWindow({ isOpen = false, title, content }) {
  return (
    <div
      className={`flex justify-center items-center fixed inset-0 z-50 bg-blue-100 transition-all duration-300 ease-in-out ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="flex justify-center items-center flex-col border-4 border-blue-900 w-96 h-96">
        <h2 className=" text-2xl font-bold">{title}</h2>
        <div>{content}</div>
      </div>
    </div>
  );
}
