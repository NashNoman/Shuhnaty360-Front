import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateShipment } from "../../api/shipments.api";
import ShipmentsForm from "../../components/ShipmentsForm";
import {
  shipmentSerializerSchema,
  ShipmentSerializerSchema,
} from "../../schemas/shipment.schema";

const EditShipment = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  const { status } = useCreateShipment();

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    // mutate(formData);
  });

  useEffect(() => {
    if (status === "success") navigate("/shipments/all");
  }, [navigate, status]);

  return (
    <ShipmentsForm
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isLoading={status === "pending"}
      control={control}
    />
  );
};

export default EditShipment;
