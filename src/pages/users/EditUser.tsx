// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect } from "react";
import { Control, useForm, UseFormRegister } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UsersUpdate } from "../../../Api";
import { useUpdateUser, useUserQuery } from "../../api/users.api";
import { useSidebar } from "../../context/SidebarContext";
import {
  UserCreateSchemaType,
  userUpdateSchema,
  UserUpdateSchemaType,
} from "../../schemas/user.schema";
import UserForm from "./components/UserForm";

const EditUser = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(userUpdateSchema),
  });

  const { data: userData, isLoading } = useUserQuery(userId);

  const { mutate, isPending } = useUpdateUser(
    userId ? parseInt(userId) : undefined,
  );

  const onSubmit = handleSubmit((formData: UserUpdateSchemaType) => {
    // TODO: Fix type issue with formData
    mutate(formData as UsersUpdate, {
      onSuccess: () => {
        navigate("/users");
      },
    });
  });

  useLayoutEffect(() => {
    if (userData?.data) {
      setValue("username", userData.data.username);
      setValue("first_name", userData.data.first_name!);
      setValue("last_name", userData.data.last_name!);
      setValue("company_branch", userData.data.company_branch?.id || 0);
      setValue("email", userData.data.email!);
      setValue("phone", userData.data.phone!);
      setValue("is_superuser", userData.data.is_active);
      setValue("is_staff", userData.data.is_staff);
      setValue("is_active", userData.data.is_active);
    }
  }, [userData, setValue]);

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
        isLoading={isLoading || isPending}
        register={register as UseFormRegister<UserCreateSchemaType>}
        errors={errors}
        control={control as Control<UserCreateSchemaType>}
        isEdit
      />
    </>
  );
};

export default EditUser;
