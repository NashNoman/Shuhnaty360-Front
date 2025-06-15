import { useDriversInfinityQuery } from "@/api/drivers.api";
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
  const { data: driversData, isLoading } = useDriversInfinityQuery();

  const driverOptions =
    driversData?.items.map((driver) => ({
      value: driver.id as number,
      label: `${driver.name} - ${driver.phone_number}`,
    })) || [];

  return (
    <Combobox
      options={driverOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={isLoading || props.disabled}
      {...props}
    />
  );
}
