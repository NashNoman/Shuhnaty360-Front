import { useShipmentsOptions } from "@/api/shipments.api";
import AutoCompleteSelectField from "@/components/ui/AutoCompleteSelectField";
import FormButton from "@/components/ui/FormButton";
import StayCostInputField from "@/components/ui/StayCostInputField";
import TextInputField from "@/components/ui/TextInputField";
import { PaymentVoucherSchema } from "@/schemas/payment-voucher.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type PaymentVouchersFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<PaymentVoucherSchema>;
  isLoading: boolean;
  errors: FieldErrors<PaymentVoucherSchema>;
  control: Control<PaymentVoucherSchema>;
  isEdit?: boolean;
};

const PaymentVouchersForm = ({
  onSubmit,
  register,
  isLoading,
  errors,
  control,
  isEdit,
}: PaymentVouchersFormProps) => {
  const { data } = useShipmentsOptions();

  return (
    <form
      onSubmit={onSubmit}
      className="border border-[#DD7E1F] bg-white rounded-lg p-8 mx-4 md:mx-0"
    >
      <div className="w-full grid md:grid-cols-2 gap-10 my-10">
        <AutoCompleteSelectField
          name="shipment"
          control={control}
          options={data.data.results || []}
          label="الشحنة"
          error={errors.shipment?.message}
        />
        <TextInputField
          label="التكلفة الأساسية"
          {...register("fare", { valueAsNumber: true })}
          type="number"
          error={errors.fare?.message}
        />
        <TextInputField
          label="الزيادة"
          {...register("premium", { valueAsNumber: true })}
          type="number"
          error={errors.premium?.message}
        />
        <TextInputField
          label="الأجرة المرتجعة"
          {...register("fare_return", { valueAsNumber: true })}
          type="number"
          error={errors.fare_return?.message}
        />
        <StayCostInputField
          control={control}
          register={register}
          errors={errors}
        />
        <TextInputField
          label="خصم"
          {...register("deducted", { valueAsNumber: true })}
          type="number"
          error={errors.deducted?.message}
        />
        <TextInputField
          label="ملاحظات"
          {...register("note")}
          error={errors.note?.message}
        />
      </div>
      <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
      <div className="mt-8">
        <FormButton disabled={isLoading} className="w-full">
          {isEdit ? "تحديث سند الصرف" : "إضافة سند الصرف"}
        </FormButton>
      </div>
    </form>
  );
};

export default PaymentVouchersForm;
