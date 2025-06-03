import { useEffect, useMemo, useState } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { DriverList } from "../../../Api";
import {
  useDriversInfinityQuery,
  useTruckTypesInfinityQuery,
} from "../../api/drivers.api";
import { ShipmentSerializerSchema } from "../../schemas/shipmentSerializerSchema";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "../ui/AutoCompleteSelectField";
import TextInputField from "../ui/TextInputField";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentDriverSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
};

const ShipmentDriverSection = ({
  register,
  errors,
  control,
}: ShipmentDriverSectionProps) => {
  const [selectedDriver, setSelectedDriver] = useState<DriverList | undefined>(
    undefined,
  );

  const { data, isLoading: isLoadingDrivers } = useDriversInfinityQuery();
  const { data: truckTypesData, isLoading: isLoadingTruckTypes } =
    useTruckTypesInfinityQuery();

  const driverOptions: AutocompleteOption[] =
    data?.items.map((driver) => ({
      value: driver.id as number,
      label: driver.name,
    })) || [];

  const truckTypeOptions: AutocompleteOption[] = useMemo(
    () =>
      truckTypesData?.items.map((type) => ({
        value: type.id as number,
        label: type.name_ar,
      })) || [],
    [truckTypesData],
  );

  useEffect(() => {
    if (selectedDriver) {
      const option = truckTypeOptions.find(
        (o) => o.label === selectedDriver.truck_type,
      );
      if (option) {
        register("truck_type").onChange({
          target: {
            value: option.value,
          },
        });
      } else {
        register("truck_type").onChange({
          target: {
            value: "",
          },
        });
      }
    }
  }, [register, selectedDriver, truckTypeOptions]);

  return (
    <ShipmentSectionWrapper title="السائق">
      <AutoCompleteSelectField
        name="driver"
        label="الاسم"
        control={control}
        options={driverOptions}
        error={errors.driver?.message}
        isLoading={isLoadingDrivers}
        onInputChange={(value) => {
          const driver = data?.items.find((driver) => driver.name === value);
          setSelectedDriver(driver);
        }}
      />
      <TextInputField
        name="driver_phone"
        value={selectedDriver?.phone_number || ""}
        label="رقم الهاتف"
        disabled
      />
      <TextInputField
        name="driver_vehicle_number"
        value={selectedDriver?.vehicle_number || ""}
        label="رقم الشاحنة"
        disabled
      />
      <AutoCompleteSelectField
        key={selectedDriver?.id}
        name="truck_type"
        label="نوع الشاحنة"
        control={control}
        options={truckTypeOptions}
        placeholder={selectedDriver?.truck_type}
        error={errors.truck_type?.message}
        isLoading={isLoadingTruckTypes}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentDriverSection;
