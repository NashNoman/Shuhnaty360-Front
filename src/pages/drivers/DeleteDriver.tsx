import DeleteItem from "../../components/shipments/deleteItem/DeleteItem";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import image from "../../assets/images/avatar.jpg";
import truckIcon from "../../assets/images/truck.svg";
import callIcon from "../../assets/images/users/call.svg";
import flagIcon from "../../assets/images/users/flag.svg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import { useDelete, useFetch } from "../../hooks/useApi";

const DeleteDriver = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();

  const { data: driverData, isLoading: isDriverDataLoading } = useFetch<any>(
    ["driver"],
    `/drivers/api/${driverId}`,
    undefined,
    !!driverId,
  );

  const { mutate: deleteMutate, isPending: isDeleting } = useDelete(
    `/drivers/api/${driverId}`,
    ["drivers", driverId],
  );

  const handleDeleteItemClick = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        toast.success("تم حذف السائق بنجاح");
        navigate("/drivers");
      },
      onError: (e: any) => {
        console.log(e);
        toast.error(
          e?.response?.data?.detail || e?.message || "حدث خطأ أثناء حذف السائق",
        );
      },
    });
  };

  const driver = driverData?.data || {};

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
    name: driver.name || "",
    image: image,
  };

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isLoading={isDeleting || isDriverDataLoading}
      handleDeleteItemClick={handleDeleteItemClick}
      page="driver"
    />
  );
};

export default DeleteDriver;
