/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import AddEditInfoSection from '../../components/shipments/addShipment/AddEditInfoSection';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useSidebar } from '../../context/SidebarContext';
import { addUser } from '../../redux/Slices/usersSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';

const AddUser = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const getApiDataFormat = (formData: any) => {
    return {
      username: formData.username,
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      is_staff: true,
      is_active: true,
    };
  };
 const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
     try {
       const response = await dispatch(addUser(getApiDataFormat(formData)));
       if (response.meta.requestStatus === 'fulfilled') {
         setIsLoading(false);
         toast.success('تم إضافة المستخدم بنجاح');
         navigate('/users');
       }
     } catch (error) {
       console.error('Error adding user:', error);
     } finally {
       setIsLoading(false);
     }
   };

  const userSectionInputsData = [
    {
      label: 'اسم المستخدم',
      name: 'username',
    },
    {
      label: 'البريد الإلكتروني',
      name: 'email',
    },
    {
      label: 'الاسم الأول',
      name: 'firstName',
    },
    {
      label: 'الاسم الأخير',
      name: 'lastName',
    },
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      className='border border-[#DD7E1F] rounded-lg p-8 mx-4 md:mx-0'
    >
      {/* <FileUploadInput /> */}
      <AddEditInfoSection
        inputs={userSectionInputsData}
        value={formData}
        onChange={handleChange}
      />
      {/* <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' /> */}
      <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
        إضافة المندوب
      </button>
    </form>
  </>
  );
};

export default AddUser;
