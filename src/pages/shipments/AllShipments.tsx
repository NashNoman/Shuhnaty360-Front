import ShipmentsFilterDialog from "../../components/shipments/filterDialog/ShipmentsFilterDialog";
import ShipmentPage from "../../components/shipments/shipmentPage/ShipmentPage";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch } from "../../hooks/useApi";
import { GetShipmentsResponse } from "../../types";

const AllShipments = () => {
  const { isSidebarOpen } = useSidebar();
  const { data: shipmentsRes, isLoading } = useFetch<GetShipmentsResponse>(
    ["shipments"],
    "/shipments/api",
  );

  const shipments = shipmentsRes?.results || [];

  console.log(shipments);

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
      <ShipmentsFilterDialog />
      <ShipmentPage shipmentsData={shipments} />
    </>
  );
};

export default AllShipments;
