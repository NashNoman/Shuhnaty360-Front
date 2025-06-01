import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUser } from "../../api/users.api";
import UserForm from "../../components/UserForm";
import { useSidebar } from "../../context/SidebarContext";
import {
  userCreateSchema,
  UserCreateSchemaType,
} from "../../schemas/user.schema";

const AddUser = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(userCreateSchema),
  });

  const { mutate, isPending: isLoading } = useCreateUser();

  const onSubmit = handleSubmit((formData: UserCreateSchemaType) => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, val]) => [
        key,
        val === "" ? undefined : val,
      ]),
    ) as UserCreateSchemaType;

    console.log(cleanedData);

    mutate(cleanedData, {
      onSuccess: () => {
        navigate("/users");
      },
      onError: (error: any) => {
        console.log(error);

        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة المستخدم",
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

      <UserForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        errors={errors}
        control={control}
      />
    </>
  );
};

export default AddUser;
