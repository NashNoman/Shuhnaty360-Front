/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Pagination from '../../components/pagination/Pagination';
import SelectMenu from '../../components/SelectMenu';
import SearchInput from '../../components/searchInput/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getUsers } from '../../redux/Slices/usersSlice';
import UsersTable from '../../components/usersDrivers/UsersTable';
import { useSidebar } from '../../context/SidebarContext';

const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'متاح', value: 'available' },
  { label: 'غير متاح', value: 'notAvailable' },
];

const Users = () => {
  const navigate = useNavigate();
  const [selectedUserStatus, setSelectedUserStatus] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const fieldsToCheck = ['username', 'first_name', 'last_name', 'email'];

  const filteredData = users.filter((user: any) =>
    fieldsToCheck.some((field) => {
      const fieldValue = user[field];
      return (
        typeof fieldValue === 'string' &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  const sortedData = [...filteredData].sort((a: any, b: any) => a.id - b.id);

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
      <div className='p-4'>
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <button
            className='flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg'
            onClick={() => {
              navigate('/users/add-user');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            إضافة مندوب
            <FiPlus size={24} />
          </button>
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='xs:text-lg text-xl text-nowrap font-bold'>قائمة المناديب</h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedUserStatus}
              setSelectedItem={setSelectedUserStatus}
            />
          </div>
          <UsersTable
            selectedStatus={selectedUserStatus}
            data={sortedData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            page='users'
          />
          <Pagination
            totalItems={sortedData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
