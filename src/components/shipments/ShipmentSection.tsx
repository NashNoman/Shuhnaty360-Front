import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useCitiesInfinityQuery } from "../../api/cities.api";
import { useShipmentStatusInfinityQuery } from "../../api/shipments.api";
import { ShipmentSerializerSchema } from "../../schemas/shipment.schema";
import AutoCompleteSelectField from "../ui/AutoCompleteSelectField";
import DatePickerField from "../ui/DatePickerField";
import TextAreaField from "../ui/TextAreaField";
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
  const { data: citiesData } = useCitiesInfinityQuery();
  const { data: statusData } = useShipmentStatusInfinityQuery();

  const cityOptions =
    citiesData?.items.map((city) => ({
      value: city.id!,
      label: city.ar_city!,
    })) || [];

  const statusOptions =
    statusData?.items.map((status) => ({
      value: status.id!,
      label: status.name_ar!,
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
        description="يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محددا للتحميل يمكنك التعديل بناء عليه."
        control={control}
      />
      <DatePickerField
        label="تاريخ التسليم"
        name="expected_arrival_date"
        error={errors.expected_arrival_date?.message}
        description="أكّد مع المستلم التاريخ الدقيق للاستلام"
        control={control}
      />
      <DatePickerField
        label="تاريخ التسليم الفعلي"
        name="actual_delivery_date"
        error={errors.actual_delivery_date?.message}
        control={control}
      />
      <TextInputField
        label="الوزن (بالطن)"
        type="number"
        error={errors.weight?.message}
        {...register("weight")}
        step={0.01}
      />
      <AutoCompleteSelectField
        name="status"
        label="حالة الشحنة"
        options={statusOptions}
        error={errors.status?.message}
        control={control}
      />
      <TextAreaField
        label="المحتويات"
        className="h-32"
        containerClassName="col-span-2"
        error={errors.contents?.message}
        {...register("contents")}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentSection;
