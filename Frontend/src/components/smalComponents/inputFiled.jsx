export function InputField({
  labelHTML,
  labelName,
  labelType,
  labelRef,
  value,
  onChange,
  name,
}) {
  return (
    <div>
      <label htmlFor={labelHTML} className="text-xl m-1">
        {labelName}
      </label>
      <input
        type={labelType}
        ref={labelRef}
        value={value}
        onChange={onChange}
        name={name}
        className="rounded-sm w-80 h-9 gap-2 p-2"
      />
    </div>
  );
}
