import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "../../components/DriverForm";
import { useSidebar } from "../../context/SidebarContext";
import { useCreate } from "../../hooks/useApi";

// Example truck types, replace with your actual data source if needed
const truckTypeOptions = [
  { value: 1, label: "سطحة" },
  { value: 2, label: "مبردة" },
  { value: 3, label: "صهريج" },
];

const AddDriver = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const { mutate, isPending: isLoading } = useCreate("/drivers/api", [
    ["drivers"],
  ]);

  const onSubmit = handleSubmit((formData: DriverFormData) => {
    // Adapt formData to your API shape if needed
    mutate(formData, {
      onSuccess: () => {
        navigate("/drivers");
        toast.success("تم إضافة السائق بنجاح");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة السائق"
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
        truckTypeOptions={truckTypeOptions}
      />
    </>
  );
};

export default AddDriver;
