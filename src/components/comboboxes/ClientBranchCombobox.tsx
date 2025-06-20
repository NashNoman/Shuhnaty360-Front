import { useClientBranchesOptions } from "@/api/clients.api";
import { useMemo } from "react";
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
  const { data: clientBranchesData } = useClientBranchesOptions();

  const branchOptions = useMemo(() => {
    if (!clientId || !clientBranchesData?.data) {
      return [];
    }

    return clientBranchesData?.data.results.filter(
      (branch) => branch.client === Number(clientId),
    );
  }, [clientId, clientBranchesData]);

  return (
    <Combobox
      options={branchOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={!clientId || props.disabled}
      {...props}
    />
  );
}
