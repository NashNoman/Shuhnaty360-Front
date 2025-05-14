/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteItem from '../../components/shipments/deleteItem/DeleteItem';

import userIdCardImage from '../../assets/images/users/personal-card.svg';
import mailIcon from '../../assets/images/users/sms.svg';
import image from '../../assets/images/avatar.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteUser, getUser } from '../../redux/Slices/usersSlice';
import { toast } from 'sonner';

const DeleteUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();
  const user = useSelector((state: RootState) => state.users.user);
  const isUserDataLoading = useSelector((state: RootState) => state.users.isLoading);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);
  const handleDeleteItemClick = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(deleteUser(userId));
      if (response.meta.requestStatus === 'fulfilled') {
        setIsLoading(false);
        toast.success('تم حذف المندوب بنجاح');
        navigate('/users');
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: 'رقم المعرف (ID)',
      value: user.id,
    },
    {
      label: 'اسم المستخدم',
      value: user.username,
    },
    {
      label: 'الاسم الأول',
      value: user.first_name,
    },
    {
      label: 'الاسم الأخير',
      value: user.last_name,
    },
    {
      image: mailIcon,
      label: 'البريد الإلكتروني',
      value: user.email,
    },
  ];

  const personalData = {
    name: user.first_name + ' ' + user.last_name,
    image: image,
  };

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isLoading={isLoading || isUserDataLoading}
      handleDeleteItemClick={handleDeleteItemClick}
      page='user'
    />
  );
};

export default DeleteUser;
