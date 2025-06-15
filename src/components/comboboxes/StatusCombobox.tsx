import { useShipmentStatusInfinityQuery } from "@/api/shipments.api";
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
  const { data: statusData, isLoading } = useShipmentStatusInfinityQuery();

  const statusOptions =
    statusData?.items.map((status) => ({
      value: status.id as number,
      label: status.name_ar,
    })) || [];

  return (
    <Combobox
      options={statusOptions}
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
