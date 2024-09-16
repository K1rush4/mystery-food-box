import React from "react";

interface ICustomCheckBox {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomCheckBox({checked, onChange}: ICustomCheckBox) {

  return (
    <div className={"relative"}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`opacity-0 peer absolute w-6 h-6 z-10`}
      />
      <div className="w-6 h-6 bg-white border-2 peer-checked:border-0  border-gray-300 rounded-md
        transition-colors duration-200 ease-in-out peer-checked:bg-moccasin"/>
      <img className={"absolute top-0 left-0 w-6 h-6 " +
        "opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ease-in-out"}
           src="public/images/checkmark.svg"/>
    </div>
  )
}