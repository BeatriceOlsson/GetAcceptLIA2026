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
      className={`border-4 border-blue-900 rounded-sm w-32 h-10 mt-4 m-auto ${className}`}
    >
      {buttonText}
    </button>
  );
}
