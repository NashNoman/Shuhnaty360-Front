import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useRecipientQuery,
  useUpdateRecipient,
} from "../../api/recipients.api";
import RecipientForm from "../../components/RecipientForm";
import { useSidebar } from "../../context/SidebarContext";
import {
  recipientSerializerSchema,
  RecipientSerializerSchema,
} from "../../schemas/recipientSerializerSchema";

const EditRecipient = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { recipientId } = useParams();

  const { data, isLoading } = useRecipientQuery(
    recipientId ? parseInt(recipientId) : undefined,
  );
  const { mutate, isPending: isUpdating } = useUpdateRecipient(
    recipientId ? parseInt(recipientId) : undefined,
  );

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<RecipientSerializerSchema>({
    resolver: zodResolver(recipientSerializerSchema),
  });

  const onSubmit = handleSubmit((formData: RecipientSerializerSchema) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم تحديث العميل بنجاح");
        navigate("/recipients");
      },
    });
  });

  useEffect(() => {
    if (data) {
      const recipientData = data.data;
      setValue("name", recipientData.name);
      setValue("address", recipientData.address);
      setValue("phone_number", recipientData.phone_number);
      setValue("second_phone_number", recipientData.second_phone_number || "");
      setValue("email", recipientData.email || "");
      setValue("city", recipientData.city);
    }
  }, [data, setValue]);

  return (
    <>
      {(isLoading || isUpdating) && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
      <RecipientForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        control={control}
        errors={errors}
        isEdit
      />
    </>
  );
};

export default EditRecipient;
