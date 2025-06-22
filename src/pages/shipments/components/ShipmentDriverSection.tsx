import {
  useDriverQuery,
  useDriversOptions,
  useTruckTypesOptions,
} from "@/api/drivers.api";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "@/components/ui/AutoCompleteSelectField";
import TextInputField from "@/components/ui/TextInputField";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
import { useEffect, useMemo } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentDriverSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
};

const ShipmentDriverSection = ({
  // register,
  errors,
  control,
  setValue,
}: ShipmentDriverSectionProps) => {
  const selectedDriverId = useWatch({
    control,
    name: "driver",
  });

  const { data } = useDriversOptions();
  const { data: truckTypesData } = useTruckTypesOptions();
  const { data: driverData } = useDriverQuery(selectedDriverId);

  const driverOptions: AutocompleteOption[] = data?.data.results || [];

  const truckTypeOptions: AutocompleteOption[] = useMemo(
    () => truckTypesData?.data.results || [],
    [truckTypesData],
  );

  useEffect(() => {
    const driver = data?.data.results.find(
      (driver) => driver.value === selectedDriverId,
    );

    if (driver) {
      const option = truckTypeOptions.find((o) => o.value === driver.value);
      if (option) {
        setValue("truck_type", option.value as number);
      } else {
        setValue("truck_type", 1);
      }
    } else {
      setValue("truck_type", 0);
    }
  }, [data?.data.results, selectedDriverId, setValue, truckTypeOptions]);

  return (
    <ShipmentSectionWrapper title="السائق">
      <AutoCompleteSelectField
        name="driver"
        label="الاسم"
        control={control}
        options={driverOptions}
        error={errors.driver?.message}
      />
      <TextInputField
        name="driver_phone"
        value={driverData?.data.phone_number || ""}
        label="رقم الهاتف"
        disabled
      />
      <TextInputField
        name="driver_vehicle_number"
        value={driverData?.data.vehicle_number || ""}
        label="رقم الشاحنة"
        disabled
      />
      <AutoCompleteSelectField
        key={selectedDriverId}
        name="truck_type"
        label="نوع الشاحنة"
        control={control}
        options={truckTypeOptions}
        // placeholder={selectedDriver?.truck_type}
        error={errors.truck_type?.message}
        // isLoading={isLoadingTruckTypes}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentDriverSection;
