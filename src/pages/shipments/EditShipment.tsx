import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useShipmentQuery, useUpdateShipment } from "../../api/shipments.api";
import ShipmentsForm from "../../components/ShipmentsForm";
import { useSidebar } from "../../context/SidebarContext";
import {
  shipmentSerializerSchema,
  ShipmentSerializerSchema,
} from "../../schemas/shipment.schema";
import { formateDateTime } from "../../utils/formatDate";

const EditShipment = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { shipmentId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  const { data, isLoading } = useShipmentQuery(shipmentId);

  const { mutate, status } = useUpdateShipment(shipmentId);

  console.log("Errors:", errors);
  console.log("Data:", data?.data);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    mutate(
      {
        user: 1,
        ...formData,
      },
      {
        onSuccess: () => {
          toast.success("تم تحديث الشحنة بنجاح");
          navigate("/shipments/all");
        },
      },
    );
  });

  useEffect(() => {
    if (data?.data) {
      const shipmentData = data.data;
      setValue("driver", shipmentData.driver?.id as number);
      setValue("truck_type", shipmentData.truck_type?.id as number);
      setValue("client", shipmentData.client?.id as number);
      setValue("client_branch", shipmentData.client_branch?.id as number);
      setValue("client_invoice_number", shipmentData.client_invoice_number);
      setValue("loading_date", formateDateTime(shipmentData.loading_date));
      setValue(
        "expected_arrival_date",
        formateDateTime(shipmentData.expected_arrival_date),
      );
      setValue(
        "actual_delivery_date",
        formateDateTime(shipmentData.actual_delivery_date),
      );
      setValue("origin_city", shipmentData.origin_city?.id as number);
      setValue("destination_city", shipmentData.destination_city?.id as number);
      setValue("contents", shipmentData.contents);
      setValue("notes", shipmentData.notes);
      setValue("status", shipmentData.status?.id as number);
      setValue("fare", shipmentData.fare || 0);
      setValue("deducted", shipmentData.deducted);
      setValue("days_stayed", shipmentData.days_stayed);
      setValue("days_to_arrive", shipmentData.days_to_arrive);
      setValue("fare_return", shipmentData.fare_return);
      setValue("recipient", shipmentData.recipient?.id as number);
      setValue("stay_cost", shipmentData.stay_cost);
      setValue("weight", shipmentData.weight);
      setValue("premium", shipmentData.premium);
    }
  }, [data, setValue]);

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
      <ShipmentsForm
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        errors={errors}
        isLoading={status === "pending"}
        control={control}
      />
    </>
  );
};

export default EditShipment;
