/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';
// import uploadImage from '../../assets/images/upload.svg';
// import infoIcon from '../../assets/images/info-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { addDriver, getTruckTypes } from '../../redux/Slices/driversSlice';
import { toast } from 'sonner';
import { useSidebar } from '../../context/SidebarContext';
import AddEditInfoSection from '../../components/shipments/addShipment/AddEditInfoSection';

const AddDriver = () => {
  const { isSidebarOpen } = useSidebar();
  // const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const truckTypes = useSelector((state: RootState) => state.drivers.truckTypes);

  
  useEffect(() => {
    dispatch(getTruckTypes());
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await dispatch(addDriver(getApiDataFormat(formData)));
      if (response.meta.requestStatus === 'fulfilled') {
        setIsLoading(false);
        toast.success('تم إضافة السائق بنجاح');
        navigate('/drivers');
      }
    } catch (error) {
      console.error('Error adding driver:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getApiDataFormat = (formData: any) => {
    return {
      name: formData.name,
      phone_number: formData.phone,
      nationality: formData.nationality,
      language: 'ar',
      identity_number: formData.nationalId,
      vehicle_number: formData.vehicleNumber,
      status: 'available',
      is_active: true,
      truck_type: formData.vehicleType,
    };
  };

  const driverSectionInputsData = [
    {
      label: 'الاسم',
      name: 'name',
    },
    {
      label: 'رقم الهوية/الإقامة',
      name: 'nationalId',
    },
    {
      label: 'رقم الهاتف',
      name: 'phone',
    },
    {
      label: 'الجنسية',
      name: 'nationality',
    },
    {
      label: 'رقم الشاحنة',
      name: 'vehicleNumber',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    id: '',
    phone: '',
    nationality: '',
    branch: '',
    vehicleType: null,
    vehicleNumber: '',
  });

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
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
          isDriver= {true}
          truckTypeOptions={truckTypes}
        />

        {/* <div>
          <h1 className='font-bold text-lg md:text-3xl my-8'>بيانات الرخصة</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {[
              {
                uploadImageTitle: 'إضافة الوجه الأمامي للرخصة',
                inputLabel: 'تاريخ الإصدار',
              },
              { uploadImageTitle: 'إضافة الوجه الخلفي للرخصة', inputLabel: 'تاريخ الانتهاء' },
            ].map((item, index) => (
              <div
                key={index}
                className='col-span-1'
              >
                <FileUploadInput title={item.uploadImageTitle} />
                <div className='col-span-1 flex flex-col gap-2 mt-8'>
                  <span className='text-[#1A1A1A] text-xl'>{item.inputLabel}</span>
                  <input
                    type='text'
                    className='p-3 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F]'
                    min={0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <div>
          <div className='flex items-center gap-2 relative'>
            <h1 className='my-12 font-bold text-lg md:text-3xl'>ملاحظات صحية</h1>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className='relative'
            >
              <img
                src={infoIcon}
                alt='Info'
                className='cursor-pointer'
              />
              {isHovered && (
                <div className='absolute bottom-10 right-1/2 transform translate-x-1/2 mt-2 w-64 rounded-2xl shadow-lg p-6 z-10 font-Rubik text-[#864D13] border border-[#DD7E1F] bg-[#FCF2E9]'>
                  <p>
                    مثل مشاكل في النظر أو القلب أو أن السائق يعاني من مرض السكري. فيجب كتابة ذلك مع
                    إضافة تقرير طبي من جهة طبية معتمدة تفيد بقدرته على القيادة
                  </p>
                  <div className='absolute -bottom-2 right-1/2 transform translate-x-1/2 w-4 h-4 bg-[#FCF2E9] rotate-45 border-b border-r border-[#DD7E1F] '></div>
                </div>
              )}
            </div>
          </div>
          <button className='flex items-center gap-2 text-[#DD7E1F] border-2 border-[#DD7E1F] py-2 px-3 text-sm rounded-lg font-Rubik mt-2'>
            <span>تحميل التقرير الطبي</span>
            <img
              src={uploadImage}
              alt='upload image'
            />
          </button>
        </div> */}
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button className='w-full py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          إضافة السائق
        </button>
      </form>
    </>
  );
};

export default AddDriver;
