import DeleteItem from "../../components/shipments/deleteItem/DeleteItem";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import image from "../../assets/images/avatar.jpg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import mailIcon from "../../assets/images/users/sms.svg";
import { useDelete, useFetch } from "../../hooks/useApi";
import { GetUserDetailsResponse } from "../../types";

const DeleteUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { data: userData, isLoading: isUserDataLoading } =
    useFetch<GetUserDetailsResponse>(
      ["user"],
      `/accounts/users/${userId}/`,
      undefined,
      !!userId,
    );

  const { mutate: deleteMutate, isPending: isDeleting } = useDelete(
    `/accounts/users/${userId}/`,
    ["users", userId],
  );

  const handleDeleteItemClick = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        toast.success("تم حذف المندوب بنجاح");
        navigate("/users");
      },
      onError: (e: any) => {
        console.log(e);

        toast.error(
          e?.response?.data?.detail ||
            e?.message ||
            "حدث خطأ أثناء حذف المستخدم",
        );
      },
    });
  };

  const user = userData?.data;

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

  const personalData = {
    name: (user?.first_name || "") + " " + (user?.last_name || ""),
    image: image,
  };

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isLoading={isDeleting || isUserDataLoading}
      handleDeleteItemClick={handleDeleteItemClick}
      page="user"
    />
  );
};

export default DeleteUser;
