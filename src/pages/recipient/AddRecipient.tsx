import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateRecipient } from "../../api/recipients.api";
import RecipientForm from "../../components/RecipientForm";
import {
  recipientSerializerSchema,
  RecipientSerializerSchema,
} from "../../schemas/recipientSerializerSchema";

const AddRecipient = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<RecipientSerializerSchema>({
    resolver: zodResolver(recipientSerializerSchema),
  });

  const { mutate, isPending: isLoading } = useCreateRecipient();

  const onSubmit = handleSubmit((formData: RecipientSerializerSchema) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم إضافة العميل بنجاح");
        navigate("/recipients");
      },
    });
  });

  return (
    <>
      <RecipientForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        control={control}
        errors={errors}
      />
    </>
  );
};

export default AddRecipient;
