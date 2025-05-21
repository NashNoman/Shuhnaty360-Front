import DeleteItem from "../../components/shipments/deleteItem/DeleteItem";

import userIdCardImage from "../../assets/images/users/personal-card.svg";
import callIcon from "../../assets/images/users/call.svg";
import flagIcon from "../../assets/images/users/flag.svg";
import image from "../../assets/images/avatar.jpg";
import truckIcon from "../../assets/images/truck.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteDriver, getDriver } from "../../redux/Slices/driversSlice";
import { toast } from "sonner";

const DeleteDriver = () => {
  const { driverId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const driver = useSelector((state: RootState) => state.drivers.driver);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isDriverDataLoading = useSelector(
    (state: RootState) => state.drivers.isLoading,
  );

  useEffect(() => {
    dispatch(getDriver(driverId));
  }, [dispatch, driverId]);

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: "رقم المعرف (ID)",
      value: driver.id,
    },
    {
      image: userIdCardImage,
      label: "رقم الهوية",
      value: driver.identity_number,
    },
    {
      image: callIcon,
      label: "رقم التواصل",
      value: driver.phone_number,
    },
    {
      image: flagIcon,
      label: "الجنسية",
      value: driver.nationality,
    },
    {
      image: truckIcon,
      label: "نوع الشاحنة",
      value: driver.truck_type,
    },
    {
      image: callIcon,
      label: "رقم الشاحنة",
      value: driver.vehicle_number,
    },
  ];

  const personalData = {
    name: driver.name,
    image: image,
  };

  const handleDeleteItemClick = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(deleteDriver(driverId));
      if (response.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        toast.success("تم حذف السائق بنجاح");
        navigate("/drivers");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isLoading={isLoading || isDriverDataLoading}
      handleDeleteItemClick={handleDeleteItemClick}
      page="driver"
    />
  );
};

export default DeleteDriver;
