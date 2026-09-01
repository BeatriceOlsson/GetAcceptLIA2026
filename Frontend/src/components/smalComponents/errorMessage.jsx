export function ErrorMessage({ error, className }) {
  return (
    <div
      className={`flex items-center justify-center text-lg text-red-700 font-medium ${className}`}
    >
      <p>{error}</p>
    </div>
  );
}
