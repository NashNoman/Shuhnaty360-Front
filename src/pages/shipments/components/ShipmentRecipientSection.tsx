import { useRecipientsInfinityQuery } from "@/api/recipients.api";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "@/components/ui/AutoCompleteSelectField";
import PhoneInputField from "@/components/ui/PhoneInputField";
import TextAreaField from "@/components/ui/TextAreaField";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
import { RecipientSerializerList } from "Api";
import { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
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
  const [selectedRecipient, setSelectedRecipient] = useState<
    RecipientSerializerList | undefined
  >();

  const [showNotes, setShowNotes] = useState(false);
  const recipientNotes = useWatch({
    control,
    name: "notes_recipient",
  });
  const hasNotes = !!recipientNotes;

  const { data: recipientsData } = useRecipientsInfinityQuery();

  const recipientOptions: AutocompleteOption[] =
    recipientsData?.items.map((item) => ({
      value: item.id as number,
      label: item.name,
    })) || [];

  const branchOptions: AutocompleteOption[] =
    recipientsData?.items?.map((item) => ({
      value: item.id!,
      label: item.address || "",
    })) || [];

  useEffect(() => {
    setShowNotes(hasNotes);
  }, [hasNotes]);

  return (
    <ShipmentSectionWrapper title="المستلِم">
      <AutoCompleteSelectField
        name="recipient"
        label="الاسم"
        control={control}
        options={recipientOptions}
        error={errors.recipient?.message}
        onInputChange={(value) => {
          const client = recipientsData?.items.find(
            (item) => item.name === value,
          );
          setSelectedRecipient(client);
        }}
      />
      <AutoCompleteSelectField
        key={selectedRecipient?.id || "none"}
        name="address"
        label="العنوان"
        control={control}
        options={branchOptions}
        disabled={!branchOptions.length}
      />
      <PhoneInputField
        name="recipient_phone"
        label="رقم الهاتف (أساسي)"
        value={selectedRecipient?.phone_number || ""}
        control={control}
      />
      <PhoneInputField
        name="recipient_phone2"
        label="رقم الهاتف (احتياطي)"
        value={selectedRecipient?.second_phone_number || ""}
        control={control}
      />
      {showNotes ? (
        <TextAreaField
          label="ملاحظات المستلم"
          containerClassName="col-span-2"
          className="h-40"
          error={errors.notes_recipient?.message}
          {...register("notes_recipient")}
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

export default ShipmentRecipientSection;
