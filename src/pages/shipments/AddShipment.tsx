import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateShipment } from "../../api/shipments.api";
import ShipmentClientSection from "../../components/shipments/ShipmentClientSection";
import ShipmentCostSection from "../../components/shipments/ShipmentCostSection";
import ShipmentDriverSection from "../../components/shipments/ShipmentDriverSection";
import ShipmentRecipientSection from "../../components/shipments/ShipmentRecipientSection";
import ShipmentSection from "../../components/shipments/ShipmentSection";
import {
  ShipmentSerializerSchema,
  shipmentSerializerSchema,
} from "../../schemas/shipmentSerializerSchema";

const AddShipment = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  const { mutate, status, error } = useCreateShipment();

  console.log(error);
  console.log(errors);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    mutate(formData);
  });

  useEffect(() => {
    if (status === "success") navigate("/shipments/all");
  }, [navigate, status]);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="border border-[#DD7E1F] rounded-lg p-8 mx-4 md:mx-0"
      >
        <ShipmentDriverSection control={control} errors={errors} />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentSection
          register={register}
          control={control}
          errors={errors}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentClientSection
          register={register}
          control={control}
          errors={errors}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        {/* <AddEditFullInfoSection
          title="المستلِم"
          section="recipient"
          options={[]}
          inputs={recipientSectionInputsData}
          value={{}}
          onChange={() => {}}
        /> */}
        <ShipmentRecipientSection
          register={register}
          control={control}
          errors={errors}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentCostSection register={register} errors={errors} />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <button
          disabled={status === "pending"}
          className="w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          إضافة الشحنة
        </button>
      </form>
    </>
  );
};

export default AddShipment;
