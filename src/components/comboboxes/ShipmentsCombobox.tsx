import { useShipmentsOptions } from "@/api/shipments.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

type ShipmentsComboboxProps = BaseComboboxProps;

export function ShipmentsCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن شحنة...",
  notFoundText = "لا يوجد شحنات متاحة",
  ...props
}: ShipmentsComboboxProps) {
  const { data: shipmentsData } = useShipmentsOptions();

  return (
    <Combobox
      options={shipmentsData.data.results}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      {...props}
    />
  );
}
