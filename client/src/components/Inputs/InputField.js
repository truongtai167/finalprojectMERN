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
    <div className="w-full flex flex-col relative mb-2">
      {value.trim() !== "" && (
        <label
          className="text-[12px] animate-slide-top-sm absolute top-0 left-[8px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}

      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border w-full my-2 placeholder:italic outline-none"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(el) =>
          setValue((prev) => ({ ...prev, [nameKey]: el.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main italic">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
}

export default InputField;
