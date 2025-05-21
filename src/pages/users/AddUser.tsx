import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserForm, { UserFormData, userSchema } from "../../components/UserForm";
import { useSidebar } from "../../context/SidebarContext";
import { useCreate } from "../../hooks/useApi";

const AddUser = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const { mutate, isPending: isLoading } = useCreate("/accounts/users/", [
    ["users"],
  ]);

  const onSubmit = handleSubmit((formData: UserFormData) => {
    mutate(formData, {
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
      />
    </>
  );
};

export default AddUser;
