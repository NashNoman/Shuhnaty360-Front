import { FieldErrors, UseFormRegister } from "react-hook-form";
import * as z from "zod";
import Card from "./ui/Card";
import SelectField from "./ui/SelectField";
import TextInputField from "./ui/TextInputField";

export const driverSchema = z.object({
  name: z.string().min(1, { message: "اسم السائق مطلوب" }),
  phone_number: z.string().min(1, { message: "رقم الهاتف مطلوب" }),
  nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
  language: z
    .enum(["ar", "en", "ur"], { required_error: "اللغة مطلوبة" })
    .or(z.literal("")),
  identity_number: z.string().min(1, { message: "رقم الهوية/الإقامة مطلوب" }),
  vehicle_number: z.string().min(1, { message: "رقم الشاحنة مطلوب" }),
  status: z
    .enum(["available", "offline", "busy"], {
      required_error: "الحالة مطلوبة",
    })
    .or(z.literal("")),
  is_active: z.boolean(),
  truck_type: z.coerce.number().or(z.literal("")),
});

export type DriverFormData = z.infer<typeof driverSchema>;

type DriverFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<DriverFormData>;
  errors: FieldErrors<DriverFormData>;
  truckTypeOptions: { value: number; label: string }[];
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
  truckTypeOptions,
}: DriverFormProps) => {
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم السائق"
            error={errors.name?.message}
            {...register("name")}
          />
          <TextInputField
            label="رقم الهاتف"
            error={errors.phone_number?.message}
            {...register("phone_number")}
          />
          <TextInputField
            label="الجنسية"
            error={errors.nationality?.message}
            {...register("nationality")}
          />
          <SelectField
            label="اللغة"
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
          <SelectField
            label="الحالة"
            error={errors.status?.message}
            options={statusOptions}
            {...register("status")}
          />
          <SelectField
            label="نوع الشاحنة"
            error={errors.truck_type?.message}
            options={truckTypeOptions}
            {...register("truck_type")}
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="is_active"
              {...register("is_active")}
              className="w-5 h-5"
            />
            <label htmlFor="is_active" className="text-lg">
              نشط
            </label>
            {errors.is_active && (
              <span className="text-red-500 text-sm">
                {errors.is_active.message}
              </span>
            )}
          </div>
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <button
          disabled={isLoading}
          className="w-full py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          إضافة السائق
        </button>
      </form>
    </Card>
  );
};

export default DriverForm;
