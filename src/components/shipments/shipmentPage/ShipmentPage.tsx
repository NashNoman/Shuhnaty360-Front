import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { Shipment } from "../../../types";
import Pagination from "../../pagination/Pagination";
import SearchInput from "../../searchInput/SearchInput";
import SelectMenu from "../../SelectMenu";
import ShipmentsTable from "../shipmentsTable/ShipmentsTable";

type ShipmentPageProps = {
  shipmentsData: Shipment[];
};

const ShipmentPage = ({ shipmentsData }: ShipmentPageProps) => {
  const navigate = useNavigate();
  const [selectedShipmentStatus, setSelectedShipmentStatus] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  const isAllShipmentsPage = location.pathname.includes("shipments/all");

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const selectMenuOptions = [
    { label: "الكل" },
    { label: "قيد الشحن" },
    { label: "متأخرة" },
    { label: "تم التوصيل" },
    { label: "مكتملة" },
    { label: "ملغية" },
    { label: "مرتجعة" },
  ];

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const fieldsToCheck = [
    "user",
    "recipient",
    "driver",
    "client_branch",
    "origin_city",
    "destination_city",
    "loading_at",
    "status",
  ];

  const sortedShipments = [...shipmentsData].sort(
    (a: any, b: any) => a.id - b.id,
  );

  const filteredData = sortedShipments.filter((shipment: Shipment) =>
    fieldsToCheck.some((field) => {
      const fieldValue = shipment[field as keyof Shipment];
      return (
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  const dataToRender = searchValue ? filteredData : sortedShipments;

  return (
    <div className="p-4">
      <div
        className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
      >
        <button
          className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
          onClick={() => {
            navigate("/shipments/add-shipment");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          إضافة شحنة
          <FiPlus size={24} />
        </button>
        <SearchInput
          value={searchValue}
          onChange={(e: any) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="shadow-xl rounded-3xl px-8 py-4">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-base md:text-xl font-bold">قائمة الشحنات</h1>
          {isAllShipmentsPage && (
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedShipmentStatus}
              setSelectedItem={setSelectedShipmentStatus}
            />
          )}
        </div>
        <ShipmentsTable
          selectedShipmentStatus={selectedShipmentStatus}
          shipmentsData={dataToRender}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          totalItems={dataToRender.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default ShipmentPage;
