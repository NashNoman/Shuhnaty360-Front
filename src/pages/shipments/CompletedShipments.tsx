/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from 'react-redux';
import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getShipments } from '../../redux/Slices/shipmentsSlice';
import { useSidebar } from '../../context/SidebarContext';

const CompletedShipments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shipments = useSelector((state: RootState) => state.shipments.shipments);
  const shipmentsData = shipments.filter((shipment: any) => shipment.status === 'مكتملة');
  const isLoading = useSelector((state: RootState) => state.shipments.isLoading);
  const { isSidebarOpen } = useSidebar();

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
      <ShipmentPage shipmentsData={shipmentsData} />
    </>
  );
};

export default CompletedShipments;
