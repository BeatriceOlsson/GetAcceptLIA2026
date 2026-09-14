import { useEffect, useState } from "react";
import { InputField } from "./inputFiled";

function SeartchFunction({
  data = [],
  seartchKey = [],
  filteredData,
  titleText,
}) {
  const [seartchData, setSeartchData] = useState("");

  const handelSeartchUpdate = (e) => {
    const value = e.target.value;
    setSeartchData(value);
  };

  useEffect(() => {
    if (!seartchData.trim()) {
      filteredData(data);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const lowerSeartch = seartchData.toLowerCase();

      const refinData = data.filter((item) => {
        return seartchKey.some((key) => {
          const value = item[key];
          return value
            ? String(value).toLowerCase().includes(lowerSeartch)
            : false;
        });
      });
      filteredData(refinData);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [seartchData, data, seartchKey, filteredData]);

  return (
    <InputField
      labelName={"Sök..."}
      labelType={"text"}
      width={"w-60"}
      className={"mr-9"}
      value={seartchData}
      titleText={titleText}
      onChange={handelSeartchUpdate}
    />
  );
}

export default SeartchFunction;
