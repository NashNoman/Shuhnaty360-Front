import { useClientsOptions } from "@/api/clients.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function ClientCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن عميل...",
  notFoundText = "لا يوجد عملاء متاحون",
  ...props
}: BaseComboboxProps) {
  const { data: clientsData } = useClientsOptions();

  const clientOptions = clientsData?.data.results || [];

  return (
    <Combobox
      options={clientOptions}
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
