import { Tooltips } from "./tooltips";

export function InputField({
  labelHTML,
  labelName,
  labelType,
  labelRef,
  value,
  onChange,
  onFocus,
  name,
  className,
  width = "w-72",
  onBlur,
  titleText,
}) {
  return (
    <div className={`flex flex-col`}>
      <label htmlFor={labelHTML} className="text-xl m-1 flex flex-row">
        {labelName}
        <Tooltips titleText={titleText} />
      </label>
      <input
        type={labelType}
        ref={labelRef}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        name={name}
        onBlur={onBlur}
        className={`rounded-lg border-2 border-gray-700 h-9 gap-2 p-2 focus:bg-orange-50 ${width} ${className}`}
      />
    </div>
  );
}
