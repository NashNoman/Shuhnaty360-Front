import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "../../components/DriverForm";
import { useSidebar } from "../../context/SidebarContext";
import { useCreate, useFetch } from "../../hooks/useApi";
import { GetTruckTypesResponse } from "../../types";

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

  const { data: truckTypesRes, isLoading: isTruckTypesLoading } =
    useFetch<GetTruckTypesResponse>(["truckType"], "drivers/api/TruckType");

  const { mutate, isPending: isLoading } = useCreate("/drivers/api", [
    ["drivers"],
  ]);

  const truckTypeOptions =
    truckTypesRes?.data?.results.map((truckType) => ({
      value: truckType.id,
      label: truckType.name_ar,
    })) || [];

  const onSubmit = handleSubmit((formData: DriverFormData) => {
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
      {(isLoading || isTruckTypesLoading) && (
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
