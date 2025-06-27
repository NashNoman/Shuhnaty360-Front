import { useCompanyBranchesOptions } from "@/api/profiles.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function BranchCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن فرع...",
  notFoundText = "لا يوجد فروع متاحة",
  ...props
}: BaseComboboxProps) {
  const { data: clientsData } = useCompanyBranchesOptions();

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
