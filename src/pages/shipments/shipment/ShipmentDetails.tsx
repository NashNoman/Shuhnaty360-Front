import deleteShipmentIcon from "../../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../../assets/images/edit-shipment-icon.svg";
import ShipmentDetailsInfoSection from "../../../components/shipments/shipmentDetails/infoSection/ShipmentDetailsInfoSection";
import ShipmentStatus from "../../../components/shipments/shipmentDetails/shipmentStatus/ShipmentStatus";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ActionsMenu from "../../../components/actionsMenu/ActionsMenu";
import PrintWaybillDialog from "../../../components/shipments/shipment/PrintWaybillDialog";
import { useSidebar } from "../../../context/SidebarContext";
import { RootState } from "../../../redux/store";

const ShipmentDetails = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSidebar();
  const { shipmentId } = useParams();
  const shipment = useSelector((state: RootState) => state.shipments.shipment);
  const driver = useSelector((state: RootState) => state.drivers.driver);
  const recipient = useSelector(
    (state: RootState) => state.recipients.recipient,
  );
  const client = useSelector((state: RootState) => state.clients.client);
  const user = useSelector((state: RootState) => state.users.user);
  const isDriverDataLoading = useSelector(
    (state: RootState) => state.drivers.isLoading,
  );
  const isClientDataLoading = useSelector(
    (state: RootState) => state.clients.isLoading,
  );
  const isRecipientDataLoading = useSelector(
    (state: RootState) => state.recipients.isLoading,
  );
  const isUsersDataLoading = useSelector(
    (state: RootState) => state.users.isLoading,
  );
  const isCitiesDataLoading = useSelector(
    (state: RootState) => state.cities.isLoading,
  );
  const truckTypes = useSelector(
    (state: RootState) => state.drivers.truckTypes,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const truckType = truckTypes.find(
    (truckType: any) => truckType.id === driver?.truck_type,
  );

  // useEffect(() => {
  //   if (shipmentId) {
  //     dispatch(getShipment(shipmentId));
  //   }
  // }, [dispatch, shipmentId]);

  // useEffect(() => {
  //   if (shipment) {
  //     dispatch(getDriver(shipment.driver));
  //     dispatch(getRecipient(shipment.recipient));
  //     dispatch(getClient(shipment.client));
  //     dispatch(getTruckTypes());
  //     dispatch(getUser(shipment.user));
  //   }
  // }, [dispatch, shipment]);

  const menuActions = [
    {
      label: "تعديل الشحنة",
      icon: editShipmentIcon,
      path: `/shipments/edit-shipment/${shipmentId}`,
    },
    {
      label: "حذف الشحنة",
      icon: deleteShipmentIcon,
      path: `/shipments/delete-shipment/${shipmentId}`,
    },
  ];

  const clientData = [
    { label: "الاسم", value: client?.name || "-" },
    { label: "العنوان", value: client?.address || "-" },
    { label: "الفرع", value: client?.branches[0].name || "-" },
  ];

  const recipientData = [
    { label: "الاسم", value: recipient?.name || "-" },
    { label: "العنوان", value: recipient?.address || "-" },
    { label: "بيانات التواصل", value: recipient?.phone_number || "-" },
  ];

  const driverData = [
    { label: "الاسم", value: driver?.name || "-" },
    { label: "نوع الشاحنة", value: truckType?.name_ar || "-" },
    { label: "رقم الشاحنة", value: driver?.vehicle_number || "-" },
  ];

  const shipmentData = [
    { label: "من", value: shipment?.origin_city || "-" },
    { label: "الى", value: shipment?.destination_city || "-" },
    { label: "المحتويات", value: shipment?.contents || "-" },
    { label: "الوزن", value: shipment?.weight || "-" },
  ];

  const shipmentCost = [
    {
      label: "التكلفة الأساسية",
      value: `${shipment?.fare} ر.س`,
    },
    {
      label: "الزيادة ",
      value: `${shipment?.premium} ر.س`,
    },
    {
      label: "الخصم",
      value: `${shipment?.deducted} ر.س`,
    },
  ];

  return (
    <>
      {(isDriverDataLoading ||
        isRecipientDataLoading ||
        isClientDataLoading ||
        isCitiesDataLoading ||
        isUsersDataLoading) && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
      <div className="border border-[#DD7E1F] rounded-lg mx-4 bg-[#FCFCFC]">
        <div className="grid xs:grid-cols-10 grid-cols-12 gap-8">
          <div
            className={`xs:col-span-10 col-span-12 ${
              isSidebarOpen ? "lg:col-span-8" : "lg:col-span-9"
            } px-6 py-8 relative`}
          >
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-[#B3B3B3] hidden lg:block"></div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold">السائق</h1>
              <ActionsMenu
                options={menuActions}
                position="top-16 left-4"
              />{" "}
            </div>
            <div className="flex flex-col items-start gap-3 font-Rubik text-[#333333] text-base">
              <ShipmentDetailsInfoSection data={driverData} />
            </div>
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-12" />{" "}
            <div className="grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-2 font-Rubik text-[#333333]">
              <ShipmentDetailsInfoSection
                title="بيانات المرسل"
                data={clientData}
              />
              <ShipmentDetailsInfoSection
                title="بيانات المستلم"
                data={recipientData}
              />
            </div>
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-12" />{" "}
            <div>
              <ShipmentDetailsInfoSection
                title="تفاصيل الشحنة"
                data={shipmentData}
              />
              <div className="bg-[#F8F8F8] w-full rounded-lg py-4 px-3 flex flex-col items-start gap-2 font-Rubik text-[#333333] border border-[#CCC] mt-6 mb-12 xs:text-base text-lg font-medium">
                {[
                  "يرجى التأكد من الشراع الثقيل",
                  "يرجى تسليم الشحنة بموعد 2025/1/20",
                  "تأكد من إرجاع جهاز الحرارة",
                ].map((item, index) => (
                  <span key={index}>- {item}</span>
                ))}
              </div>
              <div className="w-full p-6 bg-[#FCF2E9] rounded-lg">
                <h1 className="text-2xl text-center sm:text-start font-bold font-Almarai text-[#DD7E1F]">
                  تكلفة الشحنة
                </h1>
                <hr className="border-0 border-t-2 border-dashed border-[#B3B3B3] my-6" />{" "}
                <div className="flex flex-col items-start gap-2 my-6 w-full font-Rubik text-[#333333] font-bold xs:text-sm text-lg">
                  {shipmentCost.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-between items-center"
                    >
                      <span className="">{item.label}</span>{" "}
                      <span className="">{item.value}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-0 border-t-2 border-dashed border-[#666666]" />{" "}
                <div className="w-full flex justify-between items-center mt-6 font-Rubik text-[#333333] font-bold xs:text-base text-lg">
                  <span>الإجمالي</span>{" "}
                  <span className="xs:text-nowrap">
                    {shipment.fare + shipment.premium - shipment.deducted} ر.س
                  </span>
                </div>
              </div>
              <div className="my-10 w-full flex flex-col gap-2 sm:flex-row sm:gap-0 justify-center items-center font-Rubik text-[#666666] text-xl sm:text-2xl">
                <span>المندوب المسئول:</span>
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full text-center text-xl sm:text-2xl  rounded-lg py-3 text-[#FCFCFC] bg-[#DD7E1F]"
              >
                طباعة البوليصة
              </button>
            </div>
          </div>

          {shipment.history.length > 0 ? (
            <div
              className={`xs:col-span-10 col-span-12 ${
                isSidebarOpen ? "lg:col-span-4" : "lg:col-span-3"
              }`}
            >
              <ShipmentStatus history={shipment.history} />
            </div>
          ) : (
            <div
              className={`mt-4 xs:col-span-10 col-span-12 ${
                isSidebarOpen ? "lg:col-span-4" : "lg:col-span-3"
              }`}
            >
              {" "}
              <h1 className="text-center font-Rubik font-medium">
                تقرير الشحنة غير متوفر
              </h1>
            </div>
          )}
        </div>
      </div>
      <PrintWaybillDialog
        shipment={shipment}
        driver={driver}
        client={client}
        recipient={recipient}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        truckType={truckType?.name_ar}
      />
    </>
  );
};

export default ShipmentDetails;
