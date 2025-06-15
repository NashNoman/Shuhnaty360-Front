import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useClientQuery, useUpdateClient } from "../../api/clients.api";
import { useSidebar } from "../../context/SidebarContext";
import ClientForm, {
  ClientFormData,
  clientSchema,
} from "./components/ClientForm";

const EditClient = () => {
  const { isSidebarOpen } = useSidebar();
  const { clientId } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const { data, isLoading } = useClientQuery(clientId);

  const { mutate, isPending: isUpdating } = useUpdateClient(clientId);

  const onSubmit = handleSubmit((formData: ClientFormData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم إضافة العميل بنجاح");
        navigate("/clients");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة العميل",
        );
      },
    });
  });

  useEffect(() => {
    if (data?.data) {
      const client = data.data;
      setValue("name", client.name);
      setValue("email", client.email);
      setValue("address", client.address);
      setValue(
        "Commercial_registration_number",
        client.Commercial_registration_number,
      );
      setValue("dicription", client.dicription);
      setValue("phone_number", client.phone_number);
      setValue("second_phone_number", client.second_phone_number);
    }
  }, [data, setValue]);

  return (
    <>
      {(isUpdating || isLoading) && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
      <ClientForm
        onSubmit={onSubmit}
        isLoading={isUpdating}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default EditClient;
