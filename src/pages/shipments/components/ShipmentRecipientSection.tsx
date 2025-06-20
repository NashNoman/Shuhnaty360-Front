import { useRecipientQuery, useRecipientsOptions } from "@/api/recipients.api";
import AutoCompleteSelectField, {
  AutocompleteOption,
} from "@/components/ui/AutoCompleteSelectField";
import PhoneInputField from "@/components/ui/PhoneInputField";
import TextAreaField from "@/components/ui/TextAreaField";
import TextInputField from "@/components/ui/TextInputField";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
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
  const [showNotes, setShowNotes] = useState(false);
  const [recipientNotes, recipientId] = useWatch({
    control,
    name: ["notes_recipient", "recipient"],
  });
  const hasNotes = !!recipientNotes;

  const { data: recipientsData } = useRecipientsOptions();
  const { data: recipientData } = useRecipientQuery(recipientId);

  const recipientOptions: AutocompleteOption[] =
    recipientsData?.data.results || [];

  useEffect(() => {
    setShowNotes(hasNotes || showNotes);
  }, [hasNotes, showNotes]);

  return (
    <ShipmentSectionWrapper title="المستلِم">
      <AutoCompleteSelectField
        name="recipient"
        label="الاسم"
        control={control}
        options={recipientOptions}
        error={errors.recipient?.message}
      />
      <TextInputField
        value={recipientData?.data.address || undefined}
        label="العنوان"
        disabled
      />
      <PhoneInputField
        name="recipient_phone"
        label="رقم الهاتف (أساسي)"
        value={recipientData?.data.phone_number || undefined}
        control={control}
      />
      <PhoneInputField
        name="recipient_phone2"
        label="رقم الهاتف (احتياطي)"
        value={recipientData?.data.second_phone_number || undefined}
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
