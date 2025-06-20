import { useDriversOptions } from "@/api/drivers.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function DriverCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن سائق...",
  notFoundText = "لا يوجد سائقون متاحون",
  ...props
}: BaseComboboxProps) {
  const { data: driversData } = useDriversOptions();

  const driverOptions = driversData?.data.results || [];

  return (
    <Combobox
      options={driverOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={props.disabled}
      {...props}
    />
  );
}
