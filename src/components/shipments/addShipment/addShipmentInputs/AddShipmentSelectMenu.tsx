import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface SelectOption {
  [key: string]: any;
}

interface AddShipmentSelectMenuProps {
  options?: SelectOption[];
  label: string;
  title: string;
  onChange: (selected: SelectOption | null) => void;
  value: SelectOption | null;
  section?: "driver" | "shipment" | "client" | "recipient";
  isDriver?: boolean;
  isShipmentStatus?: boolean;
}

export default function AddShipmentSelectMenu({
  options = [],
  label,
  title,
  onChange,
  value,
  section,
  isDriver,
  isShipmentStatus = false,
}: AddShipmentSelectMenuProps) {
  const formattedOptions = options.map((item: SelectOption, index: number) => ({
    ...item,
    label:
      section === "shipment"
        ? `${index + 1}- ${item.ar_city || "Unknown City"}`
        : `${index + 1}- ${item.name || "Unknown Item"}`,
    displayIndex: index + 1,
  }));

  return (
    <div className="col-span-1 flex flex-col gap-1 -m-1">
      <span className="text-[#1A1A1A]">{label}</span>
      <Autocomplete
        disablePortal
        options={formattedOptions}
        getOptionLabel={(option) => {
          if (!option) return "";
          return section === "shipment"
            ? option.ar_city || "Unknown City"
            : isDriver
              ? option.name_ar
              : isShipmentStatus
                ? option.name_ar
                : option.name || "";
        }}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.displayIndex} -{" "}
            {section === "shipment"
              ? option.ar_city
              : isDriver
                ? option.name_ar
                : isShipmentStatus
                  ? option.name_ar
                  : option.name}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label={title} />}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DD7E1F",
            },
            borderRadius: "8px",
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#DD7E1F",
            },
          },
        }}
      />
    </div>
  );
}
