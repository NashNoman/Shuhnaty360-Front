import ShipmentStatusOverview from "../../../components/shipments/shipment/rejectShipment/ShipmentStatusOverview";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import DeleteItemCard from "../../../components/shipments/deleteItem/DeleteItemCard";
import {
  deleteShipment,
  getShipment,
} from "../../../redux/Slices/shipmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { toast } from "sonner";
import { useSidebar } from "../../../context/SidebarContext";
import DeleteItemDialog from "../../../components/shipments/deleteItem/deleteItemDialog";

const DeleteShipment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isShipmentDataLoading = useSelector(
    (state: RootState) => state.shipments.isLoading,
  );
  const { shipmentId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSidebar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const shipment = useSelector((state: RootState) => state.shipments.shipment);

  useEffect(() => {
    if (shipmentId) {
      dispatch(getShipment(shipmentId));
    }
  }, [dispatch, shipmentId]);

  const handleDeleteItemClick = async () => {
    setIsDialogOpen(false);
    setIsLoading(true);
    try {
      const response = await dispatch(deleteShipment(shipmentId));
      console.log("delete shipment response: ", response);
      if (response.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        toast.success("تم حذف الشحنة بنجاح");
        navigate("/shipments");
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Error deleting shipment");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {(isLoading || isShipmentDataLoading) && (
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
