import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateShipment } from "../../api/shipments.api";
import ShipmentsForm from "../../components/ShipmentsForm";
import { useAuth } from "../../hooks/useAuth";
import {
  ShipmentSerializerSchema,
  shipmentSerializerSchema,
} from "../../schemas/shipment.schema";

const AddShipment = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  const { mutate, status } = useCreateShipment();

  const onSubmit = handleSubmit((formData) => {
    mutate({
      user: userId!,
      ...formData,
    });
  });

  useEffect(() => {
    if (status === "success") navigate("/shipments/all");
  }, [navigate, status]);

  return (
    <ShipmentsForm
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      errors={errors}
      isLoading={status === "pending"}
      control={control}
    />
  );
};

export default AddShipment;
