import { FieldErrors, UseFormRegister } from "react-hook-form";
import * as z from "zod";
import Card from "./ui/Card";
import TextAreaField from "./ui/TextAreaField";
import TextInputField from "./ui/TextInputField";

// eslint-disable-next-line react-refresh/only-export-components
export const clientSchema = z.object({
  name: z.string().min(1, { message: "اسم العميل مطلوب" }),
  address: z.string().min(1, { message: "العنوان مطلوب" }),
  phone_number: z.string().min(1, { message: "رقم الهاتف مطلوب" }),
  second_phone_number: z.string().optional(),
  email: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),
  Commercial_registration_number: z.string().optional(),
  dicription: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

type ClientFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  isEdit?: boolean;
};

const ClientForm = ({
  onSubmit,
  isLoading,
  register,
  errors,
  isEdit = false,
}: ClientFormProps) => {
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم العميل"
            error={errors.name?.message}
            {...register("name")}
          />
          <TextInputField
            label="العنوان"
            error={errors.address?.message}
            {...register("address")}
          />
          <TextInputField
            label="رقم الهاتف"
            error={errors.phone_number?.message}
            {...register("phone_number")}
          />
          <TextInputField
            label="رقم هاتف إضافي"
            error={errors.second_phone_number?.message}
            {...register("second_phone_number")}
          />
          <TextInputField
            label="البريد الإلكتروني"
            error={errors.email?.message}
            {...register("email")}
          />
          <TextInputField
            label="رقم السجل التجاري"
            error={errors.Commercial_registration_number?.message}
            {...register("Commercial_registration_number")}
          />
          <TextAreaField
            label="الوصف"
            error={errors.dicription?.message}
            {...register("dicription")}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <button
          disabled={isLoading}
          className="w-full py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          {isEdit ? "تعديل العميل" : "إضافة عميل"}
        </button>
      </form>
    </Card>
  );
};

export default ClientForm;
