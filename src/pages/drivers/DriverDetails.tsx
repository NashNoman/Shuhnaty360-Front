import { useState } from "react";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import truckIcon from "../../assets/images/truck.svg";
import callIcon from "../../assets/images/users/call.svg";
import flagIcon from "../../assets/images/users/flag.svg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import SelectMenu from "../../components/SelectMenu";
import Pagination from "../../components/pagination/Pagination";
import UserDetailsTable from "../../components/usersDrivers/userDriverDetails/UserDriverDetailsTable";
import UserDriverProfileCard from "../../components/usersDrivers/userDriverDetails/userDriverProfileCard/UserDriverProfileCard";
// import ImageModal from './ImageModal';
// import frontDrivingLicenseImage from '../../assets/images/front.jpg';
// import backDrivingLicenseImage from '../../assets/images/back.jpg';
import { useParams } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch } from "../../hooks/useApi";
import { GetDriverDetailsResponse } from "../../types";

const DriverDetails = () => {
  const [selectedOption, setSelectedOption] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { driverId } = useParams();
  const { isSidebarOpen } = useSidebar();

  console.log("Driver Detail:", driverId);

  const { data: driverDetailsRes, isLoading } =
    useFetch<GetDriverDetailsResponse>(
      ["drivers", driverId],
      `/drivers/${driverId}`,
    );

  // const { data: truckTypesRes, isLoading: isTruckTypesLoading } =
  //   useFetch<GetTruckTypesResponse>(["truckType"], "drivers/api/TruckType");

  const driver = driverDetailsRes?.data;

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const personalInfoData = {
    name: driver?.name,
    status: driver?.status,
  };

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: "رقم المعرف (ID)",
      value: driver?.id,
    },
    {
      image: userIdCardImage,
      label: "رقم الهوية",
      value: driver?.identity_number,
    },
    {
      image: callIcon,
      label: "رقم التواصل",
      value: driver?.phone_number,
    },
    {
      image: flagIcon,
      label: "الجنسية",
      value: driver?.nationality,
    },
    {
      image: truckIcon,
      label: "نوع الشاحنة",
      value: driver?.truck_type?.name_ar,
    },
    {
      image: callIcon,
      label: "رقم الشاحنة",
      value: driver?.vehicle_number,
    },
  ];

  const userShipmentsData = [
    {
      source: "الرياض",
      destination: "الوجهة",
      shipmentNumber: "267400",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "month",
    },
    {
      source: "الدمام",
      destination: "الرياض",
      shipmentNumber: "651535",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "month",
    },
    {
      source: "الرياض",
      destination: "الوجهة",
      shipmentNumber: "558612",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "month",
    },
    {
      source: "الدمام",
      destination: "الرياض",
      shipmentNumber: "449003",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "week",
    },
    {
      source: "الرياض",
      destination: "الوجهة",
      shipmentNumber: "558612",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "week",
    },
    {
      source: "الدمام",
      destination: "الرياض",
      shipmentNumber: "651535",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "week",
    },
    {
      source: "الرياض",
      destination: "الوجهة",
      shipmentNumber: "653518",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "day",
    },
    {
      source: "الدمام",
      destination: "الرياض",
      shipmentNumber: "449003",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "day",
    },
    {
      source: "الدمام",
      destination: "الرياض",
      shipmentNumber: "267400",
      pickupDate: "22/05/2025",
      label: "تم التوصيل",
      shipmentStatus: "delivered",
      date: "day",
    },
  ];

  const selectMenuOptions = [
    { label: "الكل", value: "all" },
    { label: "يوم", value: "day" },
    { label: "اسبوع", value: "week" },
    { label: "شهر", value: "month" },
  ];

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/drivers/edit-driver/${driver?.id}`,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/drivers/delete-driver/${driver?.id}`,
    },
  ];

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 h-fit shadow-lg rounded-3xl px-8 py-4 w-full overflow-x-auto">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl font-bold">قائمة الشحنات</h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedOption}
              setSelectedItem={setSelectedOption}
            />
          </div>
          <UserDetailsTable
            selectedOption={selectedOption}
            userShipmentsData={userShipmentsData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <Pagination
            totalItems={userShipmentsData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
        <div className="col-span-1 min-h-screen bg-[#FCFCFC]">
          <div className="w-full shadow-sm rounded-3xl lg:px-8 py-4 mb-6">
            <UserDriverProfileCard
              personalInfoData={personalInfoData}
              moreInfoData={moreInfoData}
              menuActions={menuActions}
            />
          </div>
          {/* <hr className='border-0 border-t-2 border-[#999999] mx-8' />
        <div className=' mt-8 shadow-sm rounded-2xl px-8 py-4 border-[3px] border-[#CD2026] bg-[#FCE9EA] font-Rubik w-[90%] md:w-[80%] m-auto'>
          <h1 className='font-bold text-center text-xl'>بيانات الرخصة</h1>
          <div className='w-full mt-8'>
            {licenseInfo.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between mt-4'
              >
                <span className='font-medium xs:text-sm text-base text-nowrap'>{item.label}</span>
                <div className='md:grow flex items-center gap-2'>
                  <div className='md:grow border-t-2 border-[#999999] border-dashed mx-2'></div>
                  <span className='xs:text-sm text-base text-nowrap'>{item.value}</span>
                </div>
              </div>
            ))}
            <h1 className='font-bold text-xl text-[#CD2026] text-center mt-8'>منتهية</h1>
          </div>
        </div> */}
          {/* <div className='w-full shadow-sm rounded-3xl px-8 py-4 bg-[#FFF]'>
          <div className='flex items-center justify-center gap-2 mt-12 mb-12'>
            <h1 className='text-xl font-bold text-[##1A1A1A]'>بيان الشهر</h1>
          </div>
          <PieChart />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
