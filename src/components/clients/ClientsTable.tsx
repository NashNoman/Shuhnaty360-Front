import { useNavigate } from 'react-router-dom';
import locationIcon from '../../assets/images/location.svg';
import React from 'react';
import { ColumnFilterDropdown } from '../shipments/shipmentsTable/ColumnFilterDropdown';
import { TiFilter } from 'react-icons/ti';
import { useSidebar } from '../../context/SidebarContext';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ClientsTable = ({ data, currentPage, itemsPerPage }: any) => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();


  const filterableColumns = [
    { key: 'name', label: 'الاسم' },
    { key: 'phone_number', label: 'رقم التواصل' },
    { key: 'email', label: 'البريد الالكتروني' },
    { key: 'address', label: 'الموقع' },
  ];

  const uniqueOptions: any = {};
  filterableColumns.forEach((col) => {
    const values = data.map((item: any) => item[col.key]);
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const initialFilters: any = {};
  filterableColumns.forEach((col: any) => (initialFilters[col.key] = []));

  const [filters, setFilters] = React.useState(initialFilters);
  const [showFilter, setShowFilter] = React.useState<any>({});

  const filteredData = data.filter((item: any) =>
    Object.keys(filters).every((key) => {
      if (!filters[key] || filters[key].length === 0) return true;
      return filters[key].includes(item[key]);
    }),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const tableRowStyles = 'py-2 px-4 text-nowrap text-right';

  const tableHeading = [{ key: 'id', label: '(ID)' }, ...filterableColumns];

  return (
    <div className={`w-full overflow-x-auto min-h-[40vh]`}>
      <table className={`bg-[#FCFCFC] w-full`}>
        <thead>
          <tr className='border-b-2 border-[#CCCCCC]'>
            {tableHeading.map((col, index) => (
              <th
                key={col.key}
                className={tableRowStyles + ' relative'}
              >
                <div
                  className={`flex items-center gap-1 ${
                    index === tableHeading.length - 1 ? (isSidebarOpen ? 'lg:ms-28' : 'lg:ms-44') : ''
                  }`}
                >
                  {col.label}
                  {uniqueOptions[col.key] && (
                    <button
                      type='button'
                      onClick={() =>
                        setShowFilter((prev: any) => (prev[col.key] ? {} : { [col.key]: true }))
                      }
                    >
                      <TiFilter
                        size={22}
                        className='text-gray-400 hover:text-gray-900'
                      />
                    </button>
                  )}
                  {showFilter[col.key] && (
                    <div className='z-50'>
                      <ColumnFilterDropdown
                        options={uniqueOptions[col.key]}
                        selectedValues={filters[col.key] || []}
                        onChange={(vals: any) =>
                          setFilters((f: any) => ({
                            ...f,
                            [col.key]: vals,
                          }))
                        }
                        onClose={() =>
                          setShowFilter((f: any) => ({
                            ...f,
                            [col.key]: false,
                          }))
                        }
                        placeholder={`ابحث عن ${col.label}...`}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <div className='h-8'></div>
        <tbody className='font-Rubik text-base font-medium'>
          {paginatedData.map((item: any, index: any) => (
            <>
              <tr className={`rounded-lg ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}>
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/clients/client-details/${item.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ display: 'contents' }}
                >
                  <td className={tableRowStyles}>{item.id}</td>
                  <td className={tableRowStyles}>{item.name}</td>
                  <td className={tableRowStyles}>{item.phone_number}</td>
                  <td className={tableRowStyles}>{item.email}</td>
                  <td className='text-center flex items-center justify-center gap-4'>
                    <img
                      src={locationIcon}
                      alt='location icon'
                    />
                    <span className={`text-base text-[#DD7E1F]`}>{item.address}</span>
                  </td>
                </button>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;