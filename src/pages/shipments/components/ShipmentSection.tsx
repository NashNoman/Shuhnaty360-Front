import { useCitiesInfinityQuery } from "@/api/cities.api";
import { useShipmentStatusOptions } from "@/api/shipments.api";
import AutoCompleteSelectField from "@/components/ui/AutoCompleteSelectField";
import DatePickerField from "@/components/ui/DatePickerField";
import TextAreaField from "@/components/ui/TextAreaField";
import TextInputField from "@/components/ui/TextInputField";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
import { useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
};

const ShipmentSection = ({
  register,
  control,
  errors,
  setValue,
}: ShipmentSectionProps) => {
  const { data: citiesData } = useCitiesInfinityQuery();
  const { data: statusData } = useShipmentStatusOptions();
  const selectedStatus = useWatch({
    control,
    name: "status",
  });

  const [showActualDeliveryDate, setShowActualDeliveryDate] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [actualDeliveryDate, contents] = useWatch({
    control,
    name: ["actual_delivery_date", "contents"],
  });
  const hasActualDeliveryDate = !!actualDeliveryDate;
  const hasContents = !!contents;

  const cityOptions = useMemo(() => {
    return (
      citiesData?.items.map((city) => ({
        value: city.id!,
        label: city.ar_city!,
      })) || []
    );
  }, [citiesData]);

  const statusOptions = useMemo(() => {
    return statusData?.data.results || [];
  }, [statusData]);

  useEffect(() => {
    const status = statusOptions.find(
      (status) => status.value === selectedStatus,
    );
    if (status) {
      setValue("status", status.value);
    }
  }, [selectedStatus, setValue, statusOptions]);

  useEffect(() => {
    setShowActualDeliveryDate(hasActualDeliveryDate || showActualDeliveryDate);
  }, [hasActualDeliveryDate, showActualDeliveryDate]);

  useEffect(() => {
    setShowContent(hasContents || showContent);
  }, [hasContents, showContent]);

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
      {showActualDeliveryDate ? (
        <>
          <DatePickerField
            label="تاريح استلام الشحنه"
            name="actual_delivery_date"
            error={errors.actual_delivery_date?.message}
            description="في حال استلم العميل الشحنه فقط يرجى ادخال تاريح استلام الشحنه"
            control={control}
          />
          <span />
        </>
      ) : (
        <button
          className="py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          type="button"
          onClick={() => setShowActualDeliveryDate(!showActualDeliveryDate)}
        >
          إضافة تاريخ استلام الشحنة
        </button>
      )}

      {showContent ? (
        <TextAreaField
          label="المحتويات"
          className="min-h-40"
          containerClassName="col-span-2"
          error={errors.contents?.message}
          {...register("contents")}
        />
      ) : (
        <button
          className="py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          type="button"
          onClick={() => setShowContent(!showContent)}
        >
          إضافة المحتويات
        </button>
      )}
    </ShipmentSectionWrapper>
  );
};

export default ShipmentSection;
