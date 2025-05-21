import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./styles.css";

interface PhoneNumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput = ({
  label,
  value,
  onChange,
}: PhoneNumberInputProps) => {
  const handlePhoneChange = (phone: string) => {
    onChange(phone);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-[#1A1A1A]">{label}</label>
      <div className="relative">
        <PhoneInput
          defaultCountry="sa"
          value={value || ""}
          onChange={handlePhoneChange}
          countrySelectorStyleProps={{
            style: {
              border: "none",
              backgroundColor: "#E6E6E6",
              borderRadius: "8px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10px",
            },
            dropdownStyleProps: {
              style: {
                display: "none",
              },
            },
          }}
          inputProps={{
            required: true,
            style: {
              width: "100%",
              height: "3rem",
              textAlign: "left",
              paddingLeft: "60px",
              borderRadius: "8px",
              border: "1px solid #CCCCCC",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            },
            className:
              "!w-full !ps-3 !text-[#1A1A1A] !bg-[#FCFCFC] focus:!border-1 focus:!border-[#DD7E1F] focus:!outline-none font-Rubik",
          }}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
