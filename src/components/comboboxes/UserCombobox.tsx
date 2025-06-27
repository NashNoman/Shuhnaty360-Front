import { useUsersOptions } from "@/api/users.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function UserCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن مندوب...",
  notFoundText = "لا يوجد مناديب متاحون",
  ...props
}: BaseComboboxProps) {
  const { data: usersData } = useUsersOptions();

  const userOptions = usersData?.data.results || [];

  return (
    <Combobox
      options={userOptions}
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
