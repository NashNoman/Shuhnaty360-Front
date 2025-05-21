// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import UserForm, { UserFormData, userSchema } from "../../components/UserForm";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch, useUpdate } from "../../hooks/useApi";
import { GetUserDetailsResponse } from "../../types";

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
    `/accounts/users/${userId}`,
    undefined,
    !!userId,
  );

  const { mutate, isPending } = useUpdate(`/accounts/users/${userId}`, [
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
      // setValue("phone_number", userData.phone_number);
      // setValue("is_active", userData.is_active);
      // setValue("is_staff", userData.is_staff);
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
      <UserForm
        onSubmit={onSubmit}
        isLoading={isPending}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default EditUser;
