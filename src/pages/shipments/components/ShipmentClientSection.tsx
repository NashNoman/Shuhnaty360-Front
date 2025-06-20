import { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import {
  useClientBranchesOptions,
  useClientQuery,
  useClientsOptions,
} from "../../../api/clients.api";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "../../../components/ui/AutoCompleteSelectField";
import PhoneInputField from "../../../components/ui/PhoneInputField";
import TextAreaField from "../../../components/ui/TextAreaField";
import TextInputField from "../../../components/ui/TextInputField";
import { ShipmentSerializerSchema } from "../../../schemas/shipment.schema";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentClientSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
};

const ShipmentClientSection = ({
  register,
  errors,
  control,
}: ShipmentClientSectionProps) => {
  const [branchOptions, setBranchOptions] = useState<AutocompleteOption[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [customerNotes, clientId] = useWatch({
    control,
    name: ["notes_customer", "client"],
  });
  const hasNotes = !!customerNotes;

  const { data: clientsData } = useClientsOptions();
  const { data: branchesData } = useClientBranchesOptions();
  const { data: selectedClientData } = useClientQuery(clientId);

  const clientOptions: AutocompleteOption[] = clientsData?.data.results || [];

  useEffect(() => {
    setShowNotes(hasNotes || showNotes);
  }, [hasNotes, showNotes]);

  useEffect(() => {
    if (!clientId) {
      setBranchOptions([]);
    } else {
      const options = branchesData.data.results.filter(
        (b) => b.client === clientId,
      );
      setBranchOptions(() => options);
    }
  }, [branchesData, clientId]);

  return (
    <ShipmentSectionWrapper title="المرسِل">
      <AutoCompleteSelectField
        name="client"
        label="الاسم"
        control={control}
        options={clientOptions}
        error={errors.client?.message}
      />
      <AutoCompleteSelectField
        key={clientId || "none"}
        name="client_branch"
        label="الفرع"
        control={control}
        options={branchOptions}
        error={errors.client_branch?.message}
        disabled={!branchOptions.length}
      />
      <TextInputField
        label="رقم الفاتورة"
        type="number"
        error={errors.client_invoice_number?.message}
        {...register("client_invoice_number")}
      />
      <span />
      <PhoneInputField
        name="phone"
        label="رقم الهاتف (أساسي)"
        value={selectedClientData?.data?.phone_number || "+966"}
        control={control}
      />
      <PhoneInputField
        name="phone2"
        label="رقم الهاتف (احتياطي)"
        value={selectedClientData?.data?.second_phone_number || "+966"}
        control={control}
      />

      {showNotes ? (
        <TextAreaField
          label="ملاحظات المرسل"
          containerClassName="col-span-2"
          className="h-40"
          error={errors.notes_customer?.message}
          {...register("notes_customer")}
        />
      ) : (
        <button
          className="py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          type="button"
          onClick={() => setShowNotes(!showNotes)}
        >
          إضافة ملاحظات
        </button>
      )}
    </ShipmentSectionWrapper>
  );
};

export default ShipmentClientSection;
