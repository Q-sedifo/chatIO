import React from "react";
import cn from "classnames";

interface IBaseInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const BaseInput: React.FC<IBaseInputProps> = ({ value, className, placeholder, ref, onChange, onKeyDown }) => {
  return (
    <input
      className={cn("w-[100px] !py-[2px] !px-[5px] border border-gray-500 rounded-md focus:outline-none", className)}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown && onKeyDown}
      value={value}
      ref={ref}
    />
  )
}