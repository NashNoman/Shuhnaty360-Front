import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ShipmentSerializerSchema } from "../../schemas/shipmentSerializerSchema";
import StayCostInputField from "../ui/StayCostInputField";
import TextInputField from "../ui/TextInputField";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentCostSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
};

const ShipmentCostSection = ({
  register,
  errors,
}: ShipmentCostSectionProps) => {
  return (
    <ShipmentSectionWrapper title="التكلفة ر.س">
      <TextInputField
        label="التكلفة الأساسية"
        error={errors.fare?.message}
        type="number"
        {...register("fare")}
      />
      <TextInputField
        label="الزيادة"
        error={errors.premium?.message}
        type="number"
        {...register("premium")}
      />
      <StayCostInputField register={register} errors={errors} />
      <TextInputField
        label="الخصم"
        error={errors.deducted?.message}
        type="number"
        {...register("deducted")}
      />
      <TextInputField
        label="الأجرة المرتجعة"
        error={errors.fare_return?.message}
        type="number"
        {...register("fare_return")}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentCostSection;
