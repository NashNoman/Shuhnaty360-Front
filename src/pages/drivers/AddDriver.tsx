import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateDriver } from "../../api/drivers.api";
import { useSidebar } from "../../context/SidebarContext";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "./components/DriverForm";

const AddDriver = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const { mutate, isPending: isLoading } = useCreateDriver();

  const onSubmit = handleSubmit((formData: DriverFormData) => {
    mutate(formData, {
      onSuccess: () => {
        navigate("/drivers");
        toast.success("تم إضافة السائق بنجاح");
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة السائق",
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
      <DriverForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        errors={errors}
        control={control}
      />
    </>
  );
};

export default AddDriver;
