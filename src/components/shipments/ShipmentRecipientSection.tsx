import { useEffect, useState } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useClientQuery, useClientsInfinityQuery } from "../../api/clients";
import { ShipmentSerializerSchema } from "../../schemas/shipmentSerializerSchema";
import { ClientListItem } from "../../types/clients.types";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "../ui/AutoCompleteSelectField";
import PhoneInputField from "../ui/PhoneInputField";
import TextAreaField from "../ui/TextAreaField";
import ShipmentSectionWrapper from "./ShipmentSectionWrapper";

type ShipmentClientSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
};

const ShipmentRecipientSection = ({
  register,
  errors,
  control,
}: ShipmentClientSectionProps) => {
  const [selectedClient, setSelectedClient] = useState<
    ClientListItem | undefined
  >(undefined);
  const [branchOptions, setBranchOptions] = useState<AutocompleteOption[]>([]);

  const { data: clientsData } = useClientsInfinityQuery();
  const { data: selectedClientData, isLoading: isLoadingBranches } =
    useClientQuery(selectedClient?.id);

  const clientOptions: AutocompleteOption[] =
    clientsData?.items.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  useEffect(() => {
    const options: AutocompleteOption[] =
      selectedClientData?.data?.branches?.map((item) => ({
        value: item.id,
        label: item.address,
      })) || [];
    setBranchOptions(() => options);
  }, [selectedClientData]);

  return (
    <ShipmentSectionWrapper title="المستلِم">
      <AutoCompleteSelectField
        name="recipient"
        label="الاسم"
        control={control}
        options={clientOptions}
        error={errors.recipient?.message}
        onInputChange={(value) => {
          const client = clientsData?.items.find((item) => item.name === value);
          setSelectedClient(client);
        }}
      />
      <AutoCompleteSelectField
        key={selectedClient?.id || "none"}
        name="address"
        label="العنوان"
        control={control}
        options={branchOptions}
        isLoading={isLoadingBranches}
        disabled={!branchOptions.length}
      />
      <PhoneInputField
        name="recipient_phone"
        label="رقم الهاتف (أساسي)"
        value={selectedClient?.phone_number || "+966"}
        control={control}
      />
      <PhoneInputField
        name="recipient_phone2"
        label="رقم الهاتف (احتياطي)"
        value={selectedClient?.second_phone_number || "+966"}
        control={control}
      />
      <TextAreaField
        label="ملاحظات المستلم"
        containerClassName="col-span-2"
        className="h-40"
        error={errors.notes_recipient?.message}
        {...register("notes_recipient")}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentRecipientSection;
