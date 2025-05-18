/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import Card from "../../components/ui/Card";
import TextInputField from "../../components/ui/TextInputField";
import { useSidebar } from "../../context/SidebarContext";
import api from "../../utils/axios";

const schema = z.object({
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

type FormData = z.infer<typeof schema>;

const AddUser = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (formData: FormData) =>
      api.post("/accounts/users/", formData),
  });

  const onSubmit = handleSubmit((formData: FormData) => {
    mutate(formData, {
      onSuccess: () => {
        // navigate("/users");
      },
      onError: (error: any) => {
        console.log(error);

        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة المستخدم"
        );
      },
    });
  });

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
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
          <button
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          >
            إضافة المندوب
          </button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
