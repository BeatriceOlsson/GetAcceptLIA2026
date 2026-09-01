export function BlueButton({
  buttonClick,
  buttonText,
  type = "button",
  className = "",
}) {
  return (
    <button
      onClick={buttonClick}
      type={type}
      className={`border-2 border-gray-700 hover:bg-gray-500 hover:text-orange-400 rounded-lg active:border-orange-600 w-32 h-10 mt-4 m-auto ${className}`}
    >
      {buttonText}
    </button>
  );
}
