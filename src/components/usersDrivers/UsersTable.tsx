/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ColumnFilterDropdown } from '../shipments/shipmentsTable/ColumnFilterDropdown';
import { TiFilter } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const filterableColumns = [
  { key: 'username', label: 'اسم المستخدم' },
  { key: 'first_name', label: 'الاسم الأول' },
  { key: 'last_name', label: 'الاسم الأخير' },
  { key: 'email', label: 'البريد الالكتروني' },
  { key: 'is_active', label: 'الحالة' },
];

const initialFilters: any = {};
filterableColumns.forEach((col: any) => (initialFilters[col.key] = []));

const tableRowStyles = 'py-2 px-4 text-right text-nowrap';

const UsersTable = ({ selectedStatus, data, currentPage, itemsPerPage }: any) => {
  const navigate = useNavigate();
  const uniqueOptions: any = {};
  filterableColumns.forEach((col) => {
    let values = data.map((item: any) => item[col.key]);
    if (col.key === 'is_active') {
      values = values.map((val: any) => (val ? 'متاح' : 'غير متاح'));
    }
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const [filters, setFilters] = React.useState(initialFilters);
  const [showFilter, setShowFilter] = React.useState<any>({});

  const filteredData = data.filter(
    (item: any) =>
      Object.keys(filters).every((key) => {
        if (!filters[key] || filters[key].length === 0) return true;
        if (key === 'is_active') {
          const statusText = item.is_active ? 'متاح' : 'غير متاح';
          return filters[key].includes(statusText);
        }
        return filters[key].includes(item[key]);
      }) &&
      (selectedStatus === 'الكل' || (item.is_active ? 'متاح' : 'غير متاح') === selectedStatus),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBgColor = (status: any) => (status ? 'bg-[#B3E5BD]' : 'bg-[#CCCCCC]');
  const getStatusColor = (status: any) => (status ? 'text-[#2E853F]' : 'text-[#333333]');

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
                    index === tableHeading.length - 1 && 'ms-16'
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
            <tr
              key={item.id}
              className={`rounded-lg ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
            >
              <button
                key={index}
                onClick={() => {
                  navigate(`/users/user-details/${item.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ display: 'contents' }}
              >
                <td className={tableRowStyles}>{item.id}</td>
                <td className={tableRowStyles}>{item.username}</td>
                <td className={tableRowStyles}>{item.first_name}</td>
                <td className={tableRowStyles}>{item.last_name}</td>
                <td className={tableRowStyles}>{item?.email || '-'}</td>
                <td className={tableRowStyles}>
                  <span
                    className={`py-2 text-center font-medium inline-block rounded-md w-44 text-sm ${getStatusColor(
                      item.is_active,
                    )} ${getStatusBgColor(item.is_active)}`}
                  >
                    {item.is_active ? 'متاح' : 'غير متاح'}
                  </span>
                </td>
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;