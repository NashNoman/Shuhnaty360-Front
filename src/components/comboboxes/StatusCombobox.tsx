import { useShipmentStatusOptions } from "@/api/shipments.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function StatusCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن حالة...",
  notFoundText = "لا توجد حالات متاحة",
  ...props
}: BaseComboboxProps) {
  const { data: statusData } = useShipmentStatusOptions();

  const statusOptions = statusData?.data.results || [];

  return (
    <Combobox
      options={statusOptions}
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
