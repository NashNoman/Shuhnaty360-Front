import { useState } from "react";
import ShipmentStatusOverview from "../../components/shipments/shipment/rejectShipment/ShipmentStatusOverview";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteShipment, useShipmentQuery } from "../../api/shipments.api";
import DeleteItemCard from "../../components/shipments/deleteItem/DeleteItemCard";
import DeleteItemDialog from "../../components/shipments/deleteItem/deleteItemDialog";
import { useSidebar } from "../../context/SidebarContext";

const DeleteShipment = () => {
  const navigate = useNavigate();
  const { shipmentId } = useParams();
  const { isSidebarOpen } = useSidebar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useShipmentQuery(shipmentId);
  const { mutate: deleteShipment, isPending } = useDeleteShipment();

  const shipment = data?.data;

  const handleDeleteItemClick = async () => {
    setIsDialogOpen(false);
    deleteShipment(shipmentId, {
      onSuccess: () => {
        navigate("/shipments/all");
      },
      onError: (error: any) => {
        console.error(error);
        const errorMessage =
          error?.response?.data?.detail || "حدث خطأ أثناء حذف الشحنة";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      {(isPending || isLoading) && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
      <div className="flex flex-col gap-20">
        <ShipmentStatusOverview shipment={shipment} />
        <div className="flex justify-center items-start h-[70vh] mx-4">
          <DeleteItemCard
            handleDeleteButtonClick={() => setIsDialogOpen(true)}
          />
          <DeleteItemDialog
            label="هل أنت متأكد من حذف الشحنة؟"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleDeleteItemClick={handleDeleteItemClick}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteShipment;
