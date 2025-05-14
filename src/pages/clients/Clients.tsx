/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Pagination from '../../components/pagination/Pagination';
import SearchInput from '../../components/searchInput/SearchInput';
import { useNavigate } from 'react-router-dom';
import ClientsTable from '../../components/clients/ClientsTable';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../redux/Slices/clientsSlice';
import { useSidebar } from '../../context/SidebarContext';

const Clients = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const isLoading = useSelector((state: RootState) => state.clients.isLoading);
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const fieldsToCheck = ['name', 'address', 'phone_number'];

  const filteredData = clients.filter((client: any) =>
    fieldsToCheck.some((field) => {
      const fieldValue = client[field];
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
              navigate('/clients/add-client');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            إضافة عميل
            <FiPlus size={24} />
          </button>
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold'>قائمة العملاء</h1>
          </div>
          <ClientsTable
            data={sortedData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
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

export default Clients;
