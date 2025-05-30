import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useCitiesInfinityQuery } from "../../api/cities.api";
import { ShipmentSerializerSchema } from "../../schemas/shipmentSerializerSchema";
import AutoCompleteSelectField from "../ui/AutoCompleteSelectField";
import DatePickerField from "../ui/DatePickerField";
import TextInputField from "../ui/TextInputField";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
};

const ShipmentSection = ({
  register,
  control,
  errors,
}: ShipmentSectionProps) => {
  const { data } = useCitiesInfinityQuery();

  const cityOptions =
    data?.items.map((city) => ({
      value: city.id,
      label: city.ar_city,
    })) || [];

  return (
    <ShipmentSectionWrapper title="الشحنة">
      <AutoCompleteSelectField
        name="origin_city"
        label="تحميل من"
        options={cityOptions}
        error={errors.origin_city?.message}
        control={control}
      />
      <AutoCompleteSelectField
        name="destination_city"
        label="توصيل إلى"
        options={cityOptions}
        error={errors.destination_city?.message}
        control={control}
      />
      <DatePickerField
        label="تاريخ التحميل"
        name="loading_date"
        error={errors.loading_date?.message}
        description="يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محدددا للتحميل يمكنك التعديل بناء عليه."
        control={control}
      />
      <DatePickerField
        label="تاريخ التسليم"
        name="expected_arrival_date"
        error={errors.expected_arrival_date?.message}
        description="أكّد مع المستلم التاريخ الدقيق للاستلام"
        control={control}
      />
      {/* <DatePickerField
        label="تاريخ الاستلام"
        name="actual_delivery_date"
        error={errors.actual_delivery_date?.message}
        control={control}
      /> */}
      <TextInputField
        label="المحتويات"
        error={errors.contents?.message}
        {...register("contents")}
      />
      <TextInputField
        label="الوزن (بالطن)"
        type="number"
        error={errors.weight?.message}
        {...register("weight")}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentSection;
