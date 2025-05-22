// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import Card from "../../components/ui/Card";
import TextInputField from "../../components/ui/TextInputField";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch, useUpdate } from "../../hooks/useApi";
import { GetUserDetailsResponse } from "../../types";

const userSchema = z.object({
  username: z
    .string({
      required_error: "اسم المستخدم مطلوب",
      invalid_type_error: "اسم المستخدم يجب أن يكون نصًا",
    })
    .trim()
    .min(1, { message: "اسم المستخدم مطلوب" })
    .max(150, { message: "اسم المستخدم يجب ألا يزيد عن 150 حرفًا" })
    .regex(/^[\w.@+-]+$/, {
      message: "اسم المستخدم يحتوي على رموز غير مسموحة",
    }),
  email: z
    .string({
      invalid_type_error: "البريد الإلكتروني يجب أن يكون نصًا",
    })
    .trim()
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
    .optional()
    .or(z.literal("")),
  first_name: z
    .string({
      required_error: "الاسم الأول مطلوب",
      invalid_type_error: "الاسم الأول يجب أن يكون نصًا",
    })
    .trim()
    .min(1, { message: "الاسم الأول مطلوب" })
    .max(150, { message: "الاسم الأول يجب ألا يزيد عن 150 حرفًا" }),
  last_name: z
    .string({
      required_error: "الاسم الأخير مطلوب",
      invalid_type_error: "الاسم الأخير يجب أن يكون نصًا",
    })
    .trim()
    .min(1, { message: "الاسم الأخير مطلوب" })
    .max(150, { message: "الاسم الأخير يجب ألا يزيد عن 150 حرفًا" }),
  is_staff: z.boolean({ coerce: true }).optional(),
  is_superuser: z.boolean({ coerce: true }).optional(),
  phone: z
    .string({
      invalid_type_error: "رقم التواصل يجب أن يكون نصًا",
    })
    .trim()
    .regex(/^\+\d+$/, {
      message: "رقم التواصل يجب أن يبدأ بـ + ويحتوي على أرقام فقط",
    })
    .optional()
    .or(z.literal("")),
  company_branch: z
    .number({
      invalid_type_error: "الفرع يجب أن يكون رقمًا",
      coerce: true,
    })
    .optional()
    .or(z.literal("")),
});

type UserFormData = z.infer<typeof userSchema>;

const EditUser = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const { data: userData, isLoading } = useFetch<GetUserDetailsResponse>(
    ["user", userId],
    `/accounts/users/${userId}/`,
    undefined,
    !!userId,
  );

  const { mutate, isPending } = useUpdate(`/accounts/users/${userId}/`, [
    ["users", userId],
  ]);

  const onSubmit = handleSubmit((formData: UserFormData) => {
    mutate(formData, {
      onSuccess: () => {
        navigate("/users");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء تعديل المستخدم",
        );
      },
    });
  });

  useLayoutEffect(() => {
    if (userData?.data) {
      setValue("username", userData.data.username);
      setValue("first_name", userData.data.first_name);
      setValue("last_name", userData.data.last_name);
      setValue("email", userData.data.email);
      setValue("phone", userData.data.phone);
      setValue("is_superuser", userData.data.is_active);
      setValue("is_staff", userData.data.is_staff);
    }
  }, [userData, setValue]);

  console.log(isLoading);

  return (
    <>
      {(isLoading || isPending) && (
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
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="is_staff"
                {...register("is_staff")}
                className="w-5 h-5"
              />
              <label htmlFor="is_active" className="text-lg">
                موظف
              </label>
              {errors.is_staff && (
                <span className="text-red-500 text-sm">
                  {errors.is_staff.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="is_superuser"
                {...register("is_superuser")}
                className="w-5 h-5"
              />
              <label htmlFor="is_active" className="text-lg">
                ادمن
              </label>
              {errors.is_superuser && (
                <span className="text-red-500 text-sm">
                  {errors.is_superuser.message}
                </span>
              )}
            </div>
          </div>
          <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
          <button
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          >
            تعديل المندوب
          </button>
        </form>
      </Card>
    </>
  );
};

export default EditUser;
