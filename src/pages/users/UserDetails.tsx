/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SelectMenu from "../../components/SelectMenu";
import Pagination from "../../components/pagination/Pagination";
import UserDriverDetailsTable from "../../components/usersDrivers/userDriverDetails/UserDriverDetailsTable";
// import PieChart from '../../components/charts/PieChart';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../config";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import mailIcon from "../../assets/images/users/sms.svg";
import UserDriverProfileCard from "../../components/usersDrivers/userDriverDetails/userDriverProfileCard/UserDriverProfileCard";
import { useSidebar } from "../../context/SidebarContext";
import { User } from "../../types";

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

const UsersDetails = () => {
  const { userId } = useParams();
  const [selectedOption, setSelectedOption] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isSidebarOpen } = useSidebar();
  const { isLoading, data: user } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axios.get(
        baseURL + `/api/accounts/users/${userId}/`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );

      console.log(response.data);

      return response.data.data;
    },
    enabled: !!userId,
  });

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: "رقم المعرف (ID)",
      value: user?.id,
    },
    {
      label: "اسم المستخدم",
      value: user?.username,
    },
    {
      label: "الاسم الأول",
      value: user?.first_name,
    },
    {
      label: "الاسم الأخير",
      value: user?.last_name,
    },
    {
      image: mailIcon,
      label: "البريد الإلكتروني",
      value: user?.email,
    },
  ];

  const personalInfoData = {
    name: user?.first_name + " " + user?.last_name,
    status: user?.is_active ? "نشط" : "غير نشط",
  };

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/users/edit-user/${userId}`,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/users/delete-user/${userId}`,
    },
  ];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

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
      <div className="grid col-span-2 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 h-fit shadow-lg rounded-3xl px-8 py-4 w-full overflow-x-auto">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl font-bold">قائمة الشحنات</h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedOption}
              setSelectedItem={setSelectedOption}
            />
          </div>
          <UserDriverDetailsTable
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
              page="user"
            />
          </div>
          {/* <div className='w-full shadow-sm rounded-3xl md:px-8 py-4 bg-[#FFF]'>
          <div className='flex items-center justify-center gap-2 my-12'>
            <h1 className='text-xl font-bold text-[#333333]'>بيان الشهر</h1>
          </div>
          <PieChart />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default UsersDetails;
