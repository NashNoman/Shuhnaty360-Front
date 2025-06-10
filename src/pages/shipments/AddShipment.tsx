import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateShipment } from "../../api/shipments.api";
import ShipmentsForm from "../../components/ShipmentsForm";
import {
  ShipmentSerializerSchema,
  shipmentSerializerSchema,
} from "../../schemas/shipment.schema";

const AddShipment = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  console.log("Errors:", errors);

  const { mutate, status } = useCreateShipment();

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    mutate({
      user: 1,
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
