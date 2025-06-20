import { useTruckTypesOptions } from "@/api/drivers.api";
import AutoCompleteSelectField from "@/components/ui/AutoCompleteSelectField";
import Card from "@/components/ui/Card";
import FormButton from "@/components/ui/FormButton";
import PhoneInputField from "@/components/ui/PhoneInputField";
import SelectField from "@/components/ui/SelectField";
import TextInputField from "@/components/ui/TextInputField";
import Toggle from "@/components/ui/Toggle";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import * as z from "zod";

// eslint-disable-next-line react-refresh/only-export-components
export const driverSchema = z.object({
  name: z.string().min(1, { message: "اسم السائق مطلوب" }),
  phone_number: z.string().min(1, { message: "رقم الهاتف مطلوب" }),
  nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
  language: z.enum(["ar", "en", "ur"], { message: "اللغة مطلوبة" }).optional(),
  identity_number: z.string().min(1, { message: "رقم الهوية/الإقامة مطلوب" }),
  vehicle_number: z.string().min(1, { message: "رقم الشاحنة مطلوب" }),
  status: z
    .enum(["available", "offline", "busy"], {
      message: "الحالة مطلوبة",
    })
    .optional(),
  is_active: z.boolean().optional(),
  truck_type: z.coerce.number().optional(),
});

export type DriverFormData = z.infer<typeof driverSchema>;

type DriverFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<DriverFormData>;
  errors: FieldErrors<DriverFormData>;
  control: Control<DriverFormData>;
  isEdit?: boolean;
};

const languageOptions = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "الإنجليزية" },
  { value: "ur", label: "الأردية" },
];

const statusOptions = [
  { value: "available", label: "متاح" },
  { value: "offline", label: "غير متصل" },
  { value: "busy", label: "مشغول" },
];

const DriverForm = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
  isEdit = false,
}: DriverFormProps) => {
  const { data: truckTypesRes } = useTruckTypesOptions();

  const truckTypeOptions = truckTypesRes?.data.results || [];

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم السائق"
            error={errors.name?.message}
            {...register("name")}
          />
          <PhoneInputField
            label="رقم الهاتف"
            error={errors.phone_number?.message}
            control={control}
            name="phone_number"
          />
          <TextInputField
            label="الجنسية"
            error={errors.nationality?.message}
            {...register("nationality")}
          />
          <SelectField
            label="اللغة"
            placeholder="اختر اللغة"
            error={errors.language?.message}
            options={languageOptions}
            {...register("language")}
          />
          <TextInputField
            label="رقم الهوية/الإقامة"
            error={errors.identity_number?.message}
            {...register("identity_number")}
          />
          <TextInputField
            label="رقم الشاحنة"
            error={errors.vehicle_number?.message}
            {...register("vehicle_number")}
          />
          <AutoCompleteSelectField
            name="status"
            control={control}
            options={statusOptions}
            label="الحالة"
            placeholder="اختر الحالة"
            error={errors.status?.message}
          />
          <SelectField
            label="نوع الشاحنة"
            error={errors.truck_type?.message}
            options={truckTypeOptions}
            {...register("truck_type")}
          />
          <Toggle
            name="is_active"
            label="نشط"
            control={control}
            error={errors.is_active?.message}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <FormButton
          disabled={isLoading}
          className="w-full py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          {isEdit ? "تعديل السائق" : "إضافة سائق"}
        </FormButton>
      </form>
    </Card>
  );
};

export default DriverForm;
