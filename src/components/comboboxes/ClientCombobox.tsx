import { useClientsInfinityQuery } from "@/api/clients.api";
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
  const { data: clientsData, isLoading } = useClientsInfinityQuery();

  const clientOptions =
    clientsData?.items.map((client) => ({
      value: client.id as number,
      label: client.name,
    })) || [];

  return (
    <Combobox
      options={clientOptions}
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
