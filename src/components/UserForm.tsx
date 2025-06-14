import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useCompanyBranchesInfinityQuery } from "../api/profiles.api";
import { UserCreateSchemaType } from "../schemas/user.schema";
import AutoCompleteSelectField from "./ui/AutoCompleteSelectField";
import Card from "./ui/Card";
import FormButton from "./ui/FormButton";
import TextInputField from "./ui/TextInputField";
import Toggle from "./ui/Toggle";

type UserFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<UserCreateSchemaType>;
  errors: FieldErrors<UserCreateSchemaType>;
  control: Control<UserCreateSchemaType>;
  isEdit?: boolean;
};

const UserForm = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
  isEdit = false,
}: UserFormProps) => {
  const { data: companyBranches, isLoading: isLoadingBranches } =
    useCompanyBranchesInfinityQuery();

  const companyBranchOptions =
    companyBranches?.items.map((item) => ({
      value: item.id!,
      label: item.branch_name_ar!,
    })) || [];

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
            label="كلمة المرور"
            error={errors.password?.message}
            type="password"
            {...register("password")}
          />
          <TextInputField
            label="تأكيد كلمة المرور"
            error={errors.password2?.message}
            type="password"
            {...register("password2")}
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
          <AutoCompleteSelectField
            label="الفرع"
            name="company_branch"
            options={companyBranchOptions}
            isLoading={isLoadingBranches}
            control={control}
            error={errors.company_branch?.message}
          />
          <Toggle
            name="is_staff"
            control={control}
            label="موظف"
            error={errors.is_staff?.message}
          />
          <Toggle
            name="is_superuser"
            control={control}
            label="إداري"
            error={errors.is_superuser?.message}
          />
          <Toggle
            name="is_active"
            control={control}
            label="فعال"
            error={errors.is_active?.message}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <FormButton disabled={isLoading} type="submit" className="w-full">
          {isEdit ? "تعديل المندوب" : "إضافة المندوب"}
        </FormButton>
      </form>
    </Card>
  );
};

export default UserForm;
