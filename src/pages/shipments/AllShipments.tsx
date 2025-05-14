/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { getShipments } from '../../redux/Slices/shipmentsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import ShipmentsFilterDialog from '../../components/shipments/filterDialog/ShipmentsFilterDialog';
import { useSidebar } from '../../context/SidebarContext';

const AllShipments = () => {
  const { isSidebarOpen } = useSidebar();
  const shipments = useSelector((state: RootState) => state.shipments.shipments);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.shipments.isLoading);

  useEffect(() => {
    dispatch(getShipments());
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && 'lg:transform -translate-x-[5%]'
          }`}
        >
          <span className='loader'></span>
        </div>
      )}
      <ShipmentsFilterDialog />
      <ShipmentPage shipmentsData={shipments} />
    </>
  );
};

export default AllShipments;
