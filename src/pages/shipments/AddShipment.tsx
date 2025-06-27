import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateShipment } from "../../api/shipments.api";
import {
  ShipmentSerializerSchema,
  shipmentSerializerSchema,
} from "../../schemas/shipment.schema";
import ShipmentsForm from "./components/ShipmentsForm";

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
    defaultValues: {
      status: 1,
    },
  });

  const { mutate, status } = useCreateShipment();

  const onSubmit = handleSubmit((formData) => {
    mutate({
      ...formData,
    });
  });

  useEffect(() => {
    if (status === "success") navigate("/shipments/all");
  }, [navigate, status]);

  return (
    <Suspense fallback={<PageLoader />}>
      <ShipmentsForm
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        errors={errors}
        isLoading={status === "pending"}
        control={control}
      />
    </Suspense>
  );
};

export default AddShipment;
