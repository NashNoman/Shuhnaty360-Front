import React from "react";
import { FiLoader } from "react-icons/fi";
import { cn } from "../../utils/utils";

type ButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  isLoading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        "py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4",
        className,
        isLoading || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[#c66a1b] active:bg-[#b35c16]",
      )}
      {...props}
    >
      {isLoading ? <FiLoader className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
