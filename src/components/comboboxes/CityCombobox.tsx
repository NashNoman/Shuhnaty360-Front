import { useCitiesInfinityQuery } from "@/api/cities.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

interface CityComboboxProps extends BaseComboboxProps {
  type?: "origin" | "destination";
}

export function CityCombobox({
  value,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن مدينة...",
  notFoundText = "لا توجد مدن متاحة",
  ...props
}: CityComboboxProps) {
  const { data: citiesData, isLoading } = useCitiesInfinityQuery();

  const cityOptions =
    citiesData?.items.map((city) => ({
      value: city.id as number,
      label: city.ar_city || city.en_city || "",
    })) || [];

  return (
    <Combobox
      options={cityOptions}
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
