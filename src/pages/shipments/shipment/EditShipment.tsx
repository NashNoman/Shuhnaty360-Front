/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import AddEditInfoSection from '../../../components/shipments/addShipment/AddEditInfoSection';
import AddEditFullInfoSection from '../../../components/shipments/addShipment/AddEditFullInfoSection';
import AddEditCostSection from '../../../components/shipments/addShipment/AddEditCostSection';
import { addShipment, getShipment, getShipmentsStatus } from '../../../redux/Slices/shipmentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useSidebar } from '../../../context/SidebarContext';
import { getDriver, getDrivers, getTruckTypes } from '../../../redux/Slices/driversSlice';
import { getCities } from '../../../redux/Slices/citiesSlice';
import { getClient, getClients } from '../../../redux/Slices/clientsSlice';
import { getRecipient, getRecipients } from '../../../redux/Slices/recipientsSlice';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';

const EditShipment = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSidebar();
  const drivers = useSelector((state: RootState) => state.drivers.drivers);
  const cities = useSelector((state: RootState) => state.cities.cities);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const recipients = useSelector((state: RootState) => state.recipients.recipients);
  const [selectedClientBranches, setSelectedClientBranches] = useState<any[]>([]);
  const shipment = useSelector((state: RootState) => state.shipments.shipment);
  const client = useSelector((state: RootState) => state.clients.client);
  const driver = useSelector((state: RootState) => state.drivers.driver);
  const recipient = useSelector((state: RootState) => state.recipients.recipient);
  const isShipmentsDataLoading = useSelector((state: RootState) => state.shipments.isLoading);
  const isDriverDataLoading = useSelector((state: RootState) => state.drivers.isLoading);
  const isClientDataLoading = useSelector((state: RootState) => state.clients.isLoading);
  const isRecipientDataLoading = useSelector((state: RootState) => state.recipients.isLoading);
  const isCitiesDataLoading = useSelector((state: RootState) => state.cities.isLoading);

  const truckTypes = useSelector((state: RootState) => state.drivers.truckTypes);

  const initiallySelectedTruckType = truckTypes.find((truckType: any) => {
    return truckType.id === driver?.truck_type;
  });

  const originCity = cities.find((city: any) => city.ar_city === shipment?.origin_city);
  const destinationCity = cities.find((city: any) => city.ar_city === shipment?.destination_city);
  const shipmentsStatus = useSelector((state: RootState) => state.shipments.shipmentsStatus);
  const [isNotesAreaVisible, setIsNotesAreaVisible] = useState(false);

  useEffect(() => {
    if (shipmentId) {
      dispatch(getShipment(shipmentId));
    }
  }, [dispatch, shipmentId]);

  const [formData, setFormData] = useState<any>({
    driverId: 0,
    driverPhone: '',
    vehicleType: 0,
    vehicleNumber: '',
    pickupPointId: '',
    dropOffPointId: '',
    pickupDate: '',
    deliveryDate: '',
    daysToArrive: 0,
    contents: '',
    weight: 0,
    shipmentNotes: '',
    clientId: 0,
    clientAddress: '',
    clientBranchId: 0,
    clientInvoiceNumber: '',
    clientPrimaryPhoneNumber: '',
    clientSecondaryPhoneNumber: '',
    clientFacilityDescription: '',
    recipientId: 0,
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
  });

  useEffect(() => {
    if (!shipment || !client || !driver || !recipient) return;

    setFormData((prev: any) => ({
      ...prev,
      shipmentNotes: shipment.notes,
      driverId: shipment.driver,
      driverPhone: driver.phone_number,
      vehicleType: driver.truck_type,
      vehicleNumber: driver.vehicle_number,
      clientId: client.id,
      clientAddress: client.address,
      clientBranchId: shipment.client_branch,
      clientInvoiceNumber: shipment.client_invoice_number,
      clientPrimaryPhoneNumber: client.phone_number,
      clientSecondaryPhoneNumber: client.second_phone_number,
      clientFacilityDescription: client?.dicription,
      recipientId: recipient.id,
      recipientAddress: recipient.address,
      recipientPrimaryPhoneNumber: recipient.phone_number,
      recipientSecondaryPhoneNumber: recipient.second_phone_number,
      pickupDate: formatDate(shipment.loading_at),
      deliveryDate: formatDate(shipment.expected_arrival_date),
      daysToArrive: shipment.days_to_arrive,
      contents: shipment.contents,
      weight: shipment.weight,
      baseCost: shipment.fare || 0,
      extraCost: shipment.premium || 0,
      numberOfNights: shipment.days_stayed || 0,
      costPerNight: shipment.stay_cost || 0,
      discount: shipment.deducted || 0,
      returnFare: shipment.fare_return || 0,
      totalCost: shipment?.total_cost,
      pickupPointId: originCity?.id,
      dropOffPointId: destinationCity?.id,
    }));
  }, [shipment, client, recipient, driver, originCity, destinationCity]);

  useEffect(() => {
    const selectedClient = clients.find((client) => client.id === formData.clientId);
    setSelectedClientBranches(selectedClient?.branches || []);
  }, [formData.clientId, clients, shipment]);

  useEffect(() => {
    if (shipment) {
      dispatch(getDriver(shipment.driver));
      dispatch(getRecipient(shipment.recipient));
      dispatch(getClient(shipment.client));
    }
  }, [dispatch, shipment]);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getCities());
    dispatch(getClients());
    dispatch(getRecipients());
    dispatch(getTruckTypes());
    dispatch(getShipmentsStatus());
  }, [dispatch]);

  useEffect(() => {
    const accommodationCost = formData.numberOfNights * formData.costPerNight;
    const total = formData.baseCost + formData.extraCost + accommodationCost - formData.discount;
    setFormData((prev: any) => ({ ...prev, totalCost: total }));
  }, [
    formData.baseCost,
    formData.extraCost,
    formData.numberOfNights,
    formData.costPerNight,
    formData.discount,
  ]);

  const driverSectionInputsData = [
    { label: 'الاسم' },
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
      days_to_arrive: formData.daysToArrive,
      expected_arrival_date: formData.deliveryDate,
      contents: formData.contents,
      weight: Number(formData.weight),
      notes: formData.shipmentNotes,
      client: formData.clientId,
      client_branch: formData.clientBranchId,
      client_invoice_number: formData.clientInvoiceNumber,
      notes_client: formData.clientFacilityDescription,
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

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: any } }) => {
    setFormData((prev: { pickupPointId: any; dropOffPointId: any }) => {
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

    try {
      const response = await dispatch(addShipment(getApiDataFormat(formData)));
      if (response.meta.requestStatus === 'fulfilled') {
        setIsLoading(false);
        toast.success('تم تعديل بيانات الشحنة بنجاح');
        navigate('/shipments');
      }
    } catch (error) {
      console.error('Error adding shipment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDriver = drivers.find((driver) => driver.id === formData.driverId);
  const selectedClient = clients.find((client) => client.id === formData.clientId);
  const selectedRecipient = recipients.find((recipient) => recipient.id === formData.recipientId);
  const selectedOriginCity = cities.find((city) => city.id === formData.pickupPointId);
  const selectedDestinationCity = cities.find((city) => city.id === formData.dropOffPointId);
  const selectedShipmentStatus = shipmentsStatus.find(
    (shipmentStatus) => shipmentStatus.name_ar === shipment?.status,
  );

  return (
    <>
      {(isLoading ||
        isDriverDataLoading ||
        isRecipientDataLoading ||
        isClientDataLoading ||
        isCitiesDataLoading ||
        isShipmentsDataLoading) && (
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
        <AddEditInfoSection
          title='السائق'
          section='driver'
          options={drivers}
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
          selectMenuSelectedDriver={selectedDriver}
          isDriver={true}
          truckTypeOptions={truckTypes}
          initiallySelectedTruckType={initiallySelectedTruckType}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <AddEditInfoSection
          title='الشحنة'
          section='shipment'
          options={cities}
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
          selectedOriginCity={selectedOriginCity}
          selectedDestinationCity={selectedDestinationCity}
          shipmentsStatusOptions={shipmentsStatus}
          initiallySelectedShipmentStatus={selectedShipmentStatus}
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
          initiallySelectedClientBranchId={formData.clientBranchId}
          selectedMenuItem={selectedClient}
        />
        <AddEditFullInfoSection
          title='المستلِم'
          section='recipient'
          options={recipients}
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
          selectedMenuItem={selectedRecipient}
        />
        <AddEditCostSection
          inputs={costSectionInputsData}
          section='cost'
          setNights={(value: any) =>
            setFormData((prev: any) => ({ ...prev, numberOfNights: value }))
          }
          setCostPerNight={(value: any) =>
            setFormData((prev: any) => ({ ...prev, costPerNight: value }))
          }
          value={formData}
          onChange={handleChange}
          totalCost={formData.totalCost}
          page='editShipment'
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          تعديل الشحنة
        </button>
      </form>
    </>
  );
};

export default EditShipment;
