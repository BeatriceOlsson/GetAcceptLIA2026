export function InputField({
  labelHTML,
  labelName,
  labelType,
  labelRef,
  value,
  onChange,
  name,
  className,
  onBlur,
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={labelHTML} className="text-xl m-1">
        {labelName}
      </label>
      <input
        type={labelType}
        ref={labelRef}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        className="rounded-lg border-2 border-gray-700 w-80 h-9 gap-2 p-2 focus:bg-orange-50"
      />
    </div>
  );
}
