/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
// import AddEditFullInfoSection from '../../components/shipments/addShipment/AddEditFullInfoSection';
// import AddEditInfoSection from '../../components/shipments/addShipment/AddEditInfoSection';
// import PhoneNumberInput from '../../components/shipments/addShipment/addShipmentInputs/phoneNumberInput/PhoneNumberInput';
// import addIcon from '../../assets/images/add.svg';
import AddEditFullInfoSection from '../../components/shipments/addShipment/AddEditFullInfoSection';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { addClient } from '../../redux/Slices/clientsSlice';
import { toast } from 'sonner';

const clientSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'العنوان', name: 'address' },
  { label: 'البريد الإلكتروني', name: 'email' },
];

// const secondBranchSectionInputsData = [
//   { label: 'عنوان الفرع', name: 'secondBranchAddress' },
//   { label: 'الموقع على الخريطة', name: 'secondBranchLocationCoordinates' },
// ];

const AddClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    PrimaryPhoneNumber: '',
    SecondaryPhoneNumber: '',
    email: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      const response = await dispatch(addClient(getApiDataFormat(formData)));
      if (response.meta.requestStatus === 'fulfilled') {
        setIsLoading(false);
        toast.success('تم إضافة العميل بنجاح');
        navigate('/clients');
      }
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && 'lg:transform -translate-x-[5%]'
          }`}
        >
          <span className='loader'></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-[#DD7E1F] rounded-lg px-6 mx-4 md:mx-0'
      >
        <AddEditFullInfoSection
          title=''
          inputs={clientSectionInputsData}
          value={formData}
          onChange={handleChange}
          page='client'
          doesHaveBreakLine={false}
        />
        {/* <AddEditInfoSection
        title='الفرع (2)'
        inputs={secondBranchSectionInputsData}
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
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666] mt-12' />
      <button className='flex items-center gap-2 text-[#DD7E1F] border-2 border-[#DD7E1F] py-2 px-3 text-sm rounded-lg font-Rubik my-8'>
        <span>إضافة فرع آخر</span>
        <img
          src={addIcon}
          alt='upload image'
        />
      </button> */}
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mb-8'>
          إضافة العميل
        </button>
      </form>
    </>
  );
};

export default AddClient;
