import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "../../components/DriverForm";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch, useUpdate } from "../../hooks/useApi";
import { GetDriverDetailsResponse, GetTruckTypesResponse } from "../../types";

const EditDriver = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const { driverId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const { data: driverData, isLoading } = useFetch<GetDriverDetailsResponse>(
    ["drivers", driverId],
    `/drivers/api/${driverId}`,
    undefined,
    !!driverId,
  );

  const { data: truckTypesRes, isLoading: isTruckTypesLoading } =
    useFetch<GetTruckTypesResponse>(["truckType"], "drivers/api/TruckType");

  const { mutate } = useUpdate(`/drivers/api/${driverId}`, ["drivers"]);

  const truckTypeOptions =
    truckTypesRes?.data?.results.map((truckType) => ({
      value: truckType.id,
      label: truckType.name_ar,
    })) || [];

  const onSubmit = handleSubmit((formData: DriverFormData) => {
    mutate(formData, {
      onSuccess: () => {
        navigate("/drivers");
        toast.success("تم تعديل السائق بنجاح");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء تعديل السائق",
        );
      },
    });
  });

  useEffect(() => {
    if (driverData?.data) {
      setValue("name", driverData.data.name);
      setValue("phone_number", driverData.data.phone_number);
      setValue("identity_number", driverData.data.identity_number);
      setValue("truck_type", driverData.data.truck_type);
      setValue("status", driverData.data.status);
      setValue("is_active", driverData.data.is_active);
      setValue("language", driverData.data.language);
      setValue("nationality", driverData.data.nationality);
      setValue("vehicle_number", driverData.data.vehicle_number);
    }
  }, [driverData, register, setValue]);

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
        isEdit
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        errors={errors}
        truckTypeOptions={truckTypeOptions}
      />
    </>
  );
};

export default EditDriver;
