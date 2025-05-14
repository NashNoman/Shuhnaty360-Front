/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import AddEditInfoSection from '../../../components/shipments/addShipment/AddEditInfoSection';
import AddEditCostSection from '../../../components/shipments/addShipment/AddEditCostSection';
import { addShipment, getShipmentsStatus } from '../../../redux/Slices/shipmentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useSidebar } from '../../../context/SidebarContext';
import { getDrivers, getTruckTypes } from '../../../redux/Slices/driversSlice';
import { getCities } from '../../../redux/Slices/citiesSlice';
import { getClients } from '../../../redux/Slices/clientsSlice';
import { getRecipients } from '../../../redux/Slices/recipientsSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AddEditFullInfoSection from '../../../components/shipments/addShipment/AddEditFullInfoSection';

const AddShipment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSidebar();
  const drivers = useSelector((state: RootState) => state.drivers.drivers);
  const cities = useSelector((state: RootState) => state.cities.cities);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const recipients = useSelector((state: RootState) => state.recipients.recipients);
  const [selectedClientBranches, setSelectedClientBranches] = useState<any[]>([]);
  const shipmentsStatus = useSelector((state: RootState) => state.shipments.shipmentsStatus);

  const truckTypes = useSelector((state: RootState) => state.drivers.truckTypes);
  const [isNotesAreaVisible, setIsNotesAreaVisible] = useState(false);

  useEffect(() => {
    dispatch(getTruckTypes());
    dispatch(getShipmentsStatus());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    driverId: null,
    driverPhone: '',
    vehicleType: '',
    vehicleNumber: '',
    pickupPointId: '',
    dropOffPointId: '',
    pickupDate: '',
    deliveryDate: '',
    contents: '',
    weight: '',
    shipmentNotes: '',
    clientId: null,
    clientAddress: '',
    clientBranchId: null,
    clientInvoiceNumber: '',
    clientPrimaryPhoneNumber: '',
    clientSecondaryPhoneNumber: '',
    clientFacilityDescription: '',
    recipientId: null,
    recipientAddress: '',
    recipientPrimaryPhoneNumber: '',
    recipientSecondaryPhoneNumber: '',
    recipientFacilityDescription: '',
    baseCost: 0,
    extraCost: 0,
    numberOfNights: 0,
    costPerNight: 0,
    discount: 0,
    returnFare: 0,
    totalCost: 0,
    shipmentStatus: null,
  });

  useEffect(() => {
    const selectedClient = clients.find((client) => client.id === formData.clientId);
    setSelectedClientBranches(selectedClient?.branches || []);
    setFormData((prev) => ({
      ...prev,
      clientBranchId: null,
    }));
  }, [formData.clientId, clients]);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getCities());
    dispatch(getClients());
    dispatch(getRecipients());
  }, [dispatch]);

  useEffect(() => {
    const accommodationCost = formData.numberOfNights * formData.costPerNight;
    const total = formData.baseCost + formData.extraCost + accommodationCost - formData.discount;
    setFormData((prev) => ({ ...prev, totalCost: total }));
  }, [
    formData.baseCost,
    formData.extraCost,
    formData.numberOfNights,
    formData.costPerNight,
    formData.discount,
  ]);

  const driverSectionInputsData = [
    { label: 'الاسم', name: 'driverName' },
    { label: 'نوع الشاحنة', name: 'vehicleType' },
    { label: 'رقم الهاتف', name: 'driverPhone' },
    { label: 'رقم الشاحنة', name: 'vehicleNumber' },
  ];

  const shipmentSectionInputsData = [
    {
      label: 'تحميل من',
    },
    { label: 'توصيل إلى' },
    {
      label: 'تاريخ التحميل',
      name: 'pickupDate',
      type: 'date',
      description:
        'يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محدددا للتحميل يمكنك التعديل بناء عليه.',
    },
    {
      label: 'تاريخ التسليم',
      name: 'deliveryDate',
      type: 'date',
      description: 'أكّد مع المستلم التاريخ الدقيق للاستلام',
    },
    { label: 'المحتويات', name: 'contents' },
    { label: 'الوزن بالطن', name: 'weight' },
  ];

  const clientSectionInputsData = [
    { label: 'الاسم' },
    // { label: 'العنوان', name: 'clientAddress' },
    { label: 'رقم الفاتورة', name: 'clientInvoiceNumber', isRequired: false },
    // { label: 'إحداثيات الموقع', name: 'clientLocationCoordinates' },
  ];

  const recipientSectionInputsData = [
    { label: 'الاسم' },
    { label: 'العنوان', name: 'recipientAddress' },
    // { label: 'إحداثيات الموقع', name: 'recipientLocationCoordinates' },
  ];

  const costSectionInputsData = [
    { label: 'التكلفة الأساسية', name: 'baseCost', type: 'number' },
    { label: 'الزيادة', name: 'extraCost', type: 'number' },
  ];

  const getApiDataFormat = (formData: any) => {
    return {
      user: 3,
      driver: formData.driverId,
      origin_city: formData.pickupPointId,
      destination_city: formData.dropOffPointId,
      loading_date: formData.pickupDate,
      days_to_arrive:
        formData.pickupDate &&
        formData.deliveryDate &&
        calculateDateDifference(formData.pickupDate, formData.deliveryDate),
      expected_arrival_date: formData.deliveryDate,
      contents: formData.contents,
      weight: Number(formData.weight),
      notes: formData.shipmentNotes,
      client: formData.clientId,
      client_branch: formData.clientBranchId,
      client_invoice_number: formData.clientInvoiceNumber,
      notes_customer: formData.clientFacilityDescription,
      recipient: formData.recipientId,
      notes_recipient: formData.recipientFacilityDescription,
      fare: formData.baseCost,
      premium: Number(formData.extraCost),
      fare_return: Number(formData.returnFare),
      days_stayed: formData.numberOfNights,
      stay_cost: formData.costPerNight,
      deducted: Number(formData.discount),
      status: formData.shipmentStatus,
    };
  };

  function calculateDateDifference(pickupDateStr: string, deliveryDateStr: string): number {
    const pickupDate = new Date(pickupDateStr);
    const deliveryDate = new Date(deliveryDateStr);

    const diffTime = deliveryDate.getTime() - pickupDate.getTime();

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: any } }) => {
    setFormData((prev) => {
      if (['driver', 'client', 'recipient'].includes(e.target.name)) {
        return {
          ...prev,
          ...e.target.value,
        };
      }

      if (e.target.name === 'city') {
        return {
          ...prev,
          pickupPointId: e.target.value.pickupPointId ?? prev.pickupPointId,
          dropOffPointId: e.target.value.dropOffPointId ?? prev.dropOffPointId,
        };
      }

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(getApiDataFormat(formData));

    try {
      const response = await dispatch(addShipment(getApiDataFormat(formData)));
      console.log('response: ', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setIsLoading(false);
        toast.success('تم إضافة الشحنة بنجاح');
        navigate('/shipments');
      }
    } catch (error) {
      console.error('Error adding shipment:', error);
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
          <span className='loader'></span>a
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-[#DD7E1F] rounded-lg p-8 mx-4 md:mx-0'
      >
        <AddEditInfoSection
          title='السائق'
          section='driver'
          options={drivers}
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
          isDriver={true}
          truckTypeOptions={truckTypes}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <AddEditInfoSection
          title='الشحنة'
          section='shipment'
          options={cities}
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
          shipmentsStatusOptions={shipmentsStatus}
        />
        {isNotesAreaVisible ? (
          <div className='w-full flex flex-col items-start mb-12'>
            <span>ملاحظات</span>
            <textarea
              name='shipmentNotes'
              value={formData.shipmentNotes}
              onChange={handleChange}
              placeholder='يمكنك هنا إضافة ملاحظات يجب أن ينتبه لها السائق'
              className='w-full h-56 mt-4 mb-2 p-4 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F] resize-none font-Rubik'
            ></textarea>
            <div className='w-full flex items-center justify-end'>
              <button
                onClick={() => setIsNotesAreaVisible(false)}
                className='col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] p-2 rounded-lg'
              >
                إخفاء
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsNotesAreaVisible(true)}
            className='col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] p-2 rounded-lg mb-6'
          >
            إضافة ملاحظات
          </button>
        )}

        <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
        <AddEditFullInfoSection
          title='المرسِل'
          section='client'
          options={clients}
          inputs={clientSectionInputsData}
          value={formData}
          onChange={handleChange}
          branchOptions={selectedClientBranches}
        />
        <AddEditFullInfoSection
          title='المستلِم'
          section='recipient'
          options={recipients}
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <AddEditCostSection
          inputs={costSectionInputsData}
          section='cost'
          setNights={(value: any) => setFormData((prev) => ({ ...prev, numberOfNights: value }))}
          setCostPerNight={(value: any) =>
            setFormData((prev) => ({ ...prev, costPerNight: value }))
          }
          value={formData}
          onChange={handleChange}
          totalCost={formData.totalCost}
          page='addShipment'
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          إضافة الشحنة
        </button>
      </form>
    </>
  );
};

export default AddShipment;
