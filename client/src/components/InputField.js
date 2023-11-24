import React from "react";

function InputField({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) {
  return (
    <div className="w-full">
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border w-full my-2 placeholder:italic outline-none"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      ></input>
    </div>
  );
}

export default InputField;
