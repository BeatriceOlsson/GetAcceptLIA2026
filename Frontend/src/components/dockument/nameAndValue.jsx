import { useState } from "react";
import { useDockument } from "../../hooks/saveDataHook";
import { InputField } from "../smalComponents/inputFiled";

function NameAndValue() {
  const { saveNameValue } = useDockument();
  const [sendData, setSendData] = useState({
    name: "",
    value: "",
  });

  const handelInputDocument = async (e) => {
    const { name, value } = e.target;
    setSendData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSaveValue = async (e) => {
    if (e && e.type === "submit") {
      e.preventDefault();
    }

    saveNameValue(sendData);
    console.log(sendData);
  };
  return (
    <div className="max-w-2xl flex flex-row gap-4 m-2">
      <form
        onSubmit={handelSaveValue}
        className=" flex flex-col items-end justify-center relative b-1 w-100 gap-1"
      >
        <InputField
          labelHTML={"name"}
          labelType={"text"}
          labelName={"Dokument namn"}
          name={"name"}
          value={sendData.name}
          onChange={handelInputDocument}
          onBlur={handelSaveValue}
        />
        <InputField
          labelHTML={"value"}
          labelType={"number"}
          labelName={"Value"}
          name={"value"}
          value={sendData.value}
          onChange={handelInputDocument}
          onBlur={handelSaveValue}
        />
      </form>
    </div>
  );
}

export default NameAndValue;
