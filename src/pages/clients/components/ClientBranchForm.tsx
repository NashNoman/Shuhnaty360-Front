import Card from "@/components/ui/Card";
import PhoneInputField from "@/components/ui/PhoneInputField";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ClientBranchCreate } from "../../../../Api";
import { useCitiesOptions } from "../../../api/cities.api";
import AutoCompleteSelectField from "../../../components/ui/AutoCompleteSelectField";
import FormButton from "../../../components/ui/FormButton";
import TextInputField from "../../../components/ui/TextInputField";

interface ClientBranchFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<ClientBranchCreate>;
  errors: FieldErrors<ClientBranchCreate>;
  control: Control<ClientBranchCreate>;
  isEdit?: boolean;
}

const ClientBranchForm = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
  isEdit = false,
}: ClientBranchFormProps) => {
  const { data: citiesRes } = useCitiesOptions();
  const cityOptions = citiesRes?.data.results || [];

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم الفرع"
            error={errors.name?.message}
            {...register("name")}
          />
          <TextInputField
            label="العنوان"
            error={errors.address?.message}
            {...register("address")}
          />
          <TextInputField
            label="اسم العنوان (رابط الخريطة)"
            error={errors.name_address?.message}
            {...register("name_address")}
          />
          <PhoneInputField
            label="رقم الهاتف"
            error={errors.phone_number?.message}
            control={control}
            name="phone_number"
          />
          <PhoneInputField
            label="رقم هاتف إضافي"
            error={errors.second_phone_number?.message}
            control={control}
            name="second_phone_number"
          />
          <AutoCompleteSelectField
            name="city"
            control={control}
            options={cityOptions}
            label="المدينة"
            placeholder="اختر المدينة"
            error={errors.city?.message}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <FormButton
          disabled={isLoading}
          className="w-full py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          {isEdit ? "تعديل الفرع" : "إضافة فرع"}
        </FormButton>
      </form>
    </Card>
  );
};

export default ClientBranchForm;
