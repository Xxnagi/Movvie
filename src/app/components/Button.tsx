import React from "react";
import { ButtonProps } from "../constants/interface";

const Button = ({ text, type }: ButtonProps) => {
  return (
    <div
      className={`w-fit px-8 h-12 rounded-md flex justify-center items-center ${
        type === "primary" ? "bg-white text-black" : "bg-white/50 text-white"
      }`}
    >
      <p className="text-center font-semibold text-lg">{text}</p>
    </div>
  );
};

export default Button;
