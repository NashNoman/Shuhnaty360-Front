import { useRecipientsOptions } from "@/api/recipients.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function RecipientCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن مستلم...",
  notFoundText = "لا يوجد مستلمون متاحون",
  ...props
}: BaseComboboxProps) {
  const { data: recipientsData } = useRecipientsOptions();

  const recipientOptions = recipientsData?.data.results || [];

  return (
    <Combobox
      options={recipientOptions}
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
