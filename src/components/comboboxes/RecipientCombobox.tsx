import { useRecipientsInfinityQuery } from "@/api/recipients.api";
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
  const { data: recipientsData, isLoading } = useRecipientsInfinityQuery();

  const recipientOptions =
    recipientsData?.items.map((recipient) => ({
      value: recipient.id as number,
      label: recipient.name,
    })) || [];

  return (
    <Combobox
      options={recipientOptions}
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
