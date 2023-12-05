import React, { memo } from "react";
import clsx from "clsx";

const InputForm = ({
  register,
  errors,
  id,
  validate,
  label,
  disable,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col h-[78px] gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disable}
        placeholder={placeholder}
        className={clsx("form-input my-auto", fullWidth && "w-full")}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className="text-sx text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
