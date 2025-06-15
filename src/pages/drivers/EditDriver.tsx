import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useDriverQuery,
  useTruckTypesInfinityQuery,
  useUpdateDriver,
} from "../../api/drivers.api";
import { useSidebar } from "../../context/SidebarContext";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "./components/DriverForm";

const EditDriver = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const { driverId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const { data: driverData, isLoading } = useDriverQuery(driverId);
  const { data: truckTypesRes } = useTruckTypesInfinityQuery();

  const truckType =
    truckTypesRes?.items?.find(
      (type) => type.name_ar === driverData?.data?.truck_type,
    )?.id || 0;

  const { mutate } = useUpdateDriver(driverId);

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
      setValue("truck_type", truckType);
      setValue("status", driverData.data.status);
      setValue("is_active", driverData.data.is_active);
      setValue("language", driverData.data.language);
      setValue("nationality", driverData.data.nationality);
      setValue("vehicle_number", driverData.data.vehicle_number);
    }
  }, [driverData, register, setValue, truckType]);

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
        key={truckType}
        isEdit
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        errors={errors}
        control={control}
      />
    </>
  );
};

export default EditDriver;
