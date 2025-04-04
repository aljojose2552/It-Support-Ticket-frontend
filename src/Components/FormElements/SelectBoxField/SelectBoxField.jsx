import React from "react";

const SelectBoxField = ({
  label,
  value,
  onChange,
  options,
  name,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {label && (
        <label htmlFor="" className=" ">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full h-[40px] outline-none bg-gray-100 rounded-md px-2 py-1 cursor-pointer text-sm"
      >
        <option value="" disabled className="text-sm">
          Select A Value
        </option>
        {options.map((opt, ind) => (
          <option value={opt.value} key={ind}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBoxField;
