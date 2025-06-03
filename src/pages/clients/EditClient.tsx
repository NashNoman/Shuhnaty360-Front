// import AddEditInfoSection from '../../components/shipments/addShipment/AddEditInfoSection';
// import PhoneNumberInput from '../../components/shipments/addShipment/addShipmentInputs/phoneNumberInput/PhoneNumberInput';
// import addIcon from '../../assets/images/add.svg';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useUpdateClient } from "../../api/clients.api";
import ClientForm, {
  ClientFormData,
  clientSchema,
} from "../../components/ClientForm";
import { useSidebar } from "../../context/SidebarContext";

const EditClient = () => {
  const { isSidebarOpen } = useSidebar();
  const { clientId } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const { mutate, isPending: isLoading } = useUpdateClient(clientId);

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

  return (
    <>
      {isLoading && (
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
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default EditClient;
