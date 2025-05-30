import React from "react";
import { Control, useController } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

type PhoneInputProps = React.ComponentProps<typeof PhoneInput>;

export type PhoneInputFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string | string[];
  disabled?: boolean;
} & Omit<PhoneInputProps, "someIncompatibleProp1" | "someIncompatibleProp2">; // Replace 'someIncompatibleProp' with the actual prop names

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  error,
  description,
  disabled,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="col-span-1 flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <PhoneInput
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        countrySelectorStyleProps={{
          className:
            "border-none bg-[#E6E6E6] rounded-lg rounded-tl-none rounded-bl-none flex items-center justify-center px-2.5",
          dropdownStyleProps: {
            className: "hidden",
          },
        }}
        inputProps={{
          required: true,
          className:
            "!w-full !ps-4 !text-[#1A1A1A] !bg-[#FCFCFC] h-12 rounded-lg border border-[#CCCCCC] rounded-tr-none rounded-br-none text-left font-Rubik focus:!border-1 focus:!border-[#DD7E1F] focus:!outline-none",
        }}
        defaultCountry="sa"
        {...props}
      />
      {error && <span className="text-red-500 mt-1 text-sm">{error}</span>}
      {description && (
        <div className="text-[#999] font-Rubik text-sm">
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((desc, index) => (
                <li key={index} className="text-[#666666]">
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <span>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneInputField;
