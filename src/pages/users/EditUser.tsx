/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import AddEditInfoSection from '../../components/shipments/addShipment/AddEditInfoSection';
// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, getUser } from '../../redux/Slices/usersSlice';
import { useSidebar } from '../../context/SidebarContext';
import { toast } from 'sonner';

const EditUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);
  const [isLoading, setIsLoading] = useState(false);
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const isUserDataLoading = useSelector((state: RootState) => state.users.isLoading);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      }));
    }
  }, [user]);

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
      is_superuser: true,
    };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(userId)
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await dispatch(
        editUser({
          id: userId,
          data: getApiDataFormat(formData),
        }),
      );
      console.log(response);
      if (response.meta.requestStatus === 'fulfilled') {
        setIsLoading(false);
        toast.success('تم تعديل بيانات العميل بنجاح');
        navigate('/users');
      }
    } catch (error: any) {
      console.error('Error editing user:', error);
      toast.error(error.message);
      setIsLoading(false);
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
      {(isLoading || isUserDataLoading) && (
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
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'
        >
          تحديث البيانات
        </button>
      </form>
    </>
  );
};

export default EditUser;
