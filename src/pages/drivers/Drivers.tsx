import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import DriversTable from "../../components/usersDrivers/DriversTable";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch } from "../../hooks/useApi";
import { GetDriversResponse } from "../../types";

const selectMenuOptions = [
  { label: "الكل" },
  { label: "متاح" },
  { label: "غير متاح" },
  { label: "مشغول" },
];

const fieldsToCheck = [
  "name",
  "language",
  "nationality",
  "identity_number",
  "phone_number",
  "vehicle_number",
  "status",
];

const Drivers = () => {
  const navigate = useNavigate();
  const [selectedDriverStatus, setSelectedDriverStatus] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const { isSidebarOpen } = useSidebar();

  const { data: driversRes, isLoading } = useFetch<GetDriversResponse>(
    ["drivers"],
    "/drivers/api",
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const filteredData = driversRes?.data.results.filter((user: any) =>
    fieldsToCheck.some((field) => {
      const fieldValue = user[field];
      return (
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  const sortedData = filteredData
    ? [...filteredData].sort((a: any, b: any) => a.id - b.id)
    : [];

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

      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <button
            className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
            onClick={() => {
              navigate("/drivers/add-driver");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            إضافة سائق
            <FiPlus size={24} />
          </button>
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="shadow-xl rounded-3xl px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl text-nowrap font-bold">
              قائمة السائقين
            </h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedDriverStatus}
              setSelectedItem={setSelectedDriverStatus}
            />
          </div>
          <DriversTable
            selectedStatus={selectedDriverStatus}
            data={sortedData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <Pagination
            totalItems={sortedData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Drivers;
