import { useEffect, useState } from "react";
import AddEditFullInfoSection from "../../components/shipments/addShipment/AddEditFullInfoSection";
// import AddEditInfoSection from '../../components/shipments/addShipment/AddEditInfoSection';
// import PhoneNumberInput from '../../components/shipments/addShipment/addShipmentInputs/phoneNumberInput/PhoneNumberInput';
// import addIcon from '../../assets/images/add.svg';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { editClient, getClient } from "../../redux/Slices/clientsSlice";
import { useSidebar } from "../../context/SidebarContext";
import { toast } from "sonner";

const EditClient = () => {
  const { clientId } = useParams();
  const client = useSelector((state: RootState) => state.clients.client);
  const [isLoading, setIsLoading] = useState(false);
  const isUserDataLoading = useSelector(
    (state: RootState) => state.clients.isLoading,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    if (clientId) {
      dispatch(getClient(clientId));
    }
  }, [dispatch, clientId]);

  useEffect(() => {
    if (client) {
      setFormData((prev) => ({
        ...prev,
        name: client.name,
        address: client.address,
        PrimaryPhoneNumber: client.phone_number,
        SecondaryPhoneNumber: client.second_phone_number,
        email: client.email,
        description: client.dicription,
      }));
    }
  }, [client]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    PrimaryPhoneNumber: "",
    SecondaryPhoneNumber: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clientSectionInputsData = [
    { label: "الاسم", name: "name" },
    { label: "العنوان", name: "address" },
    { label: "البريد الإلكتروني", name: "email" },
  ];

  // const branchSectionInputsData = [
  //   { label: 'عنوان الفرع', name: 'secondBranchAddress' },
  //   { label: 'الموقع على الخريطة', name: 'secondBranchLocationCoordinates' },
  // ];

  // const handlePhoneChange = (name: keyof FormData, value: string) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const getApiDataFormat = (formData: any) => {
    return {
      name: formData.name,
      address: formData.address,
      phone_number: formData.PrimaryPhoneNumber,
      second_phone_number: formData.SecondaryPhoneNumber,
      email: formData.email,
      dicription: formData.description,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await dispatch(
        editClient({
          id: clientId,
          data: getApiDataFormat(formData),
        }),
      );
      if (response.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        toast.success("تم تعديل بيانات العميل بنجاح");
        navigate("/clients");
      }
    } catch (error) {
      console.error("Error editing client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {(isLoading || isUserDataLoading) && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border border-[#DD7E1F] rounded-lg px-6 mx-4 md:mx-0"
      >
        <AddEditFullInfoSection
          title=""
          inputs={clientSectionInputsData}
          value={formData}
          onChange={handleChange}
          page="client"
          doesHaveBreakLine={false}
        />
        {/* <AddEditInfoSection
        isEditClientPage={true}
        title='الفرع (2)'
        inputs={branchSectionInputsData}
        value={formData}
        onChange={handleChange}
      /> */}
        {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {['secondBranchPrimaryPhoneNumber', 'secondBranchSecondaryPhoneNumber'].map((type) => (
          <PhoneNumberInput
            key={type}
            label={`رقم الهاتف (${
              type === 'secondBranchPrimaryPhoneNumber' ? 'أساسي' : 'احتياطي'
            })`}
            value={formData[type as keyof FormData]}
            onChange={(val: string) => handlePhoneChange(type as keyof FormData, val)}
          />
        ))}
      </div> */}
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666] mt-12' /> */}
        {/* <button className='flex items-center gap-2 text-[#DD7E1F] border-2 border-[#DD7E1F] py-2 px-3 text-sm rounded-lg font-Rubik my-8'>
        <span>إضافة فرع آخر</span>
        <img
          src={addIcon}
          alt='upload image'
        />
      </button> */}
        <button className="w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mb-8">
          تحديث البيانات
        </button>
      </form>
    </>
  );
};

export default EditClient;
