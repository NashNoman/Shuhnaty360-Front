import { useClientQuery } from "@/api/clients.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

interface ClientBranchComboboxProps extends BaseComboboxProps {
  clientId?: number | string;
}

export function ClientBranchCombobox({
  clientId,
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن فرع...",
  notFoundText = "لا يوجد فروع متاحة",
  ...props
}: ClientBranchComboboxProps) {
  const { data: clientData, isLoading } = useClientQuery(
    clientId ? Number(clientId) : undefined,
  );

  const branchOptions =
    clientData?.data?.branches?.map((branch) => ({
      value: branch.id as number,
      label: branch.name,
    })) || [];

  return (
    <Combobox
      options={branchOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={isLoading || !clientId || props.disabled}
      {...props}
    />
  );
}
