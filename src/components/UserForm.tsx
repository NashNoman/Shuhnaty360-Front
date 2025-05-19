import { FieldErrors, UseFormRegister } from "react-hook-form";
import * as z from "zod";
import Card from "./ui/Card";
import TextInputField from "./ui/TextInputField";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "اسم المستخدم مطلوب",
      invalid_type_error: "اسم المستخدم يجب أن يكون نصًا",
    })
    .min(1, { message: "اسم المستخدم مطلوب" })
    .max(150, { message: "اسم المستخدم يجب ألا يزيد عن 150 حرفًا" })
    .regex(/^[\w.@+-]+$/, {
      message: "اسم المستخدم يحتوي على رموز غير مسموحة",
    }),
  email: z
    .string({
      invalid_type_error: "البريد الإلكتروني يجب أن يكون نصًا",
    })
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
    .optional()
    .or(z.literal("")),
  first_name: z
    .string({
      required_error: "الاسم الأول مطلوب",
      invalid_type_error: "الاسم الأول يجب أن يكون نصًا",
    })
    .min(1, { message: "الاسم الأول مطلوب" })
    .max(150, { message: "الاسم الأول يجب ألا يزيد عن 150 حرفًا" }),
  last_name: z
    .string({
      required_error: "الاسم الأخير مطلوب",
      invalid_type_error: "الاسم الأخير يجب أن يكون نصًا",
    })
    .min(1, { message: "الاسم الأخير مطلوب" })
    .max(150, { message: "الاسم الأخير يجب ألا يزيد عن 150 حرفًا" }),
  // is_staff: z.boolean(),
  // is_active: z.boolean(),
  phone: z
    .string({
      invalid_type_error: "رقم التواصل يجب أن يكون نصًا",
    })
    .regex(/^\+\d+$/, {
      message: "رقم التواصل يجب أن يبدأ بـ + ويحتوي على أرقام فقط",
    })
    .optional()
    .or(z.literal("")),
  company_branch: z
    .number({
      invalid_type_error: "الفرع يجب أن يكون رقمًا",
    })
    .optional()
    .or(z.literal("")),
});

export type UserFormData = z.infer<typeof userSchema>;

type UserFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;
};

const UserForm = ({ onSubmit, isLoading, errors, register }: UserFormProps) => {
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم المستخدم"
            error={errors.username?.message}
            {...register("username")}
          />
          <TextInputField
            label="البريد الإلكتروني"
            error={errors.email?.message}
            type="email"
            {...register("email")}
          />
          <TextInputField
            label="الاسم الأول"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <TextInputField
            label="الاسم الأخير"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
          <TextInputField
            label="رقم التواصل"
            error={errors.phone?.message}
            type="number"
            {...register("phone")}
          />
          <TextInputField
            label="الفرع"
            error={errors.company_branch?.message}
            {...register("company_branch")}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <button
          disabled={isLoading}
          className="w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          إضافة المندوب
        </button>
      </form>
    </Card>
  );
};

export default UserForm;
