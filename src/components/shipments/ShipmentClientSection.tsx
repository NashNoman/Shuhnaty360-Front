import { useEffect, useState } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ClientSerializerList } from "../../../Api";
import { useClientQuery, useClientsInfinityQuery } from "../../api/clients.api";
import { ShipmentSerializerSchema } from "../../schemas/shipmentSerializerSchema";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "../ui/AutoCompleteSelectField";
import PhoneInputField from "../ui/PhoneInputField";
import TextAreaField from "../ui/TextAreaField";
import TextInputField from "../ui/TextInputField";
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
  const [selectedClient, setSelectedClient] = useState<
    ClientSerializerList | undefined
  >(undefined);
  const [branchOptions, setBranchOptions] = useState<AutocompleteOption[]>([]);

  const { data: clientsData } = useClientsInfinityQuery();
  const { data: selectedClientData, isLoading: isLoadingBranches } =
    useClientQuery(selectedClient?.id);

  const clientOptions: AutocompleteOption[] =
    clientsData?.items.map((item) => ({
      value: item.id as number,
      label: item.name,
    })) || [];

  useEffect(() => {
    const options: AutocompleteOption[] =
      selectedClientData?.data?.branches?.map((item) => ({
        value: item.id as number,
        label: item.name,
      })) || [];
    setBranchOptions(() => options);
  }, [selectedClientData]);

  return (
    <ShipmentSectionWrapper title="المرسِل">
      <AutoCompleteSelectField
        name="client"
        label="الاسم"
        control={control}
        options={clientOptions}
        error={errors.client?.message}
        onInputChange={(value) => {
          const client = clientsData?.items.find((item) => item.name === value);
          setSelectedClient(client);
        }}
      />
      <AutoCompleteSelectField
        key={selectedClient?.id || "none"}
        name="client_branch"
        label="الفرع"
        control={control}
        options={branchOptions}
        error={errors.client_branch?.message}
        isLoading={isLoadingBranches}
        // onInputChange={(value) => {
        //   const branch = data?.items.find((item) => item.name === value);
        // }}
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
        value={selectedClient?.phone_number || "+966"}
        control={control}
      />
      <PhoneInputField
        name="phone2"
        label="رقم الهاتف (احتياطي)"
        value={selectedClient?.second_phone_number || "+966"}
        control={control}
      />
      <TextAreaField
        label="ملاحظات المرسل"
        containerClassName="col-span-2"
        className="h-40"
        error={errors.notes_customer?.message}
        {...register("notes_customer")}
      />
    </ShipmentSectionWrapper>
  );
};

export default ShipmentClientSection;
