import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { getDriversListOptions } from "../../api/drivers.api";
import { ShipmentSerializerSchema } from "../../schemas/shipmentSerializerSchema";
import { Driver } from "../../types";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "../ui/AutoCompleteSelectField";
import TextInputField from "../ui/TextInputField";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentDriverSectionProps = {
  // register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
};

const ShipmentDriverSection = ({
  // register,
  errors,
  control,
}: ShipmentDriverSectionProps) => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(
    undefined,
  );

  const { data } = useInfiniteQuery(getDriversListOptions());

  const driverOptions: AutocompleteOption[] =
    data?.map((driver) => ({
      value: driver.id,
      label: driver.name,
    })) || [];

  return (
    <ShipmentSectionWrapper title="السائق">
      <AutoCompleteSelectField
        name="driver"
        label="الاسم"
        control={control}
        options={driverOptions}
        error={errors.driver?.message}
        onInputChange={(value) => {
          const driver = data?.find((driver) => driver.name === value);
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
      <TextInputField
        name="driver_vehicle_type"
        value={selectedDriver?.truck_type?.name_ar || ""}
        label="نوع الشاحنة"
        disabled
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentDriverSection;
