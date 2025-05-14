/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { formatDate } from '../../../utils/formatDate';
import { ColumnFilterDropdown } from './ColumnFilterDropdown';
import { TiFilter } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const filterableColumns = [
  { key: 'user', label: 'المندوب' },
  { key: 'recipient', label: 'المستلم' },
  { key: 'driver', label: 'السائق' },
  { key: 'client_branch', label: 'الفرع' },
  { key: 'origin_city', label: 'المصدر' },
  { key: 'destination_city', label: 'الوجهة' },
  { key: 'loading_at', label: 'تاريخ التحميل' },
  { key: 'status', label: 'حالة الشحنة' },
];

const initialFilters: any = {};
filterableColumns.forEach((col) => (initialFilters[col.key] = []));

const ShipmentsTable = ({
  selectedShipmentStatus,
  shipmentsData,
  currentPage,
  itemsPerPage,
}: any) => {
  const navigate = useNavigate();
  const [loadingAtSort, setLoadingAtSort] = React.useState<'asc' | 'desc' | undefined>();
  const uniqueOptions: any = {};
  filterableColumns.forEach((col) => {
    let values = shipmentsData.map((s: any) => s[col.key]);
    if (col.key === 'loading_at') {
      values = values.filter(Boolean).map((dateStr: string) => formatDate(dateStr));
    }
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const [filters, setFilters] = React.useState(initialFilters);
  const [showFilter, setShowFilter] = React.useState<any>({});

  const filteredData = shipmentsData.filter(
    (shipment: any) =>
      Object.keys(filters).every((key) => {
        if (key === 'loading_at') {
          if (!filters[key] || filters[key].length === 0) return true;
          return filters[key].includes(formatDate(shipment.loading_at));
        }
        return !filters[key] || filters[key].length === 0 || filters[key].includes(shipment[key]);
      }) &&
      (selectedShipmentStatus === 'الكل' ||
        shipment.status.toLowerCase() === selectedShipmentStatus.toLowerCase()),
  );

  const sortedData = [...filteredData];
  if (loadingAtSort === 'asc') {
    sortedData.sort(
      (a, b) => new Date(a.loading_at || 0).getTime() - new Date(b.loading_at || 0).getTime(),
    );
  }
  if (loadingAtSort === 'desc') {
    sortedData.sort(
      (a, b) => new Date(b.loading_at || 0).getTime() - new Date(a.loading_at || 0).getTime(),
    );
  }

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const tableRowStyles = 'py-2 px-4 text-nowrap text-right';

  const tableHeading = [
    { label: 'رقم الشحنة', key: 'id' },
    { label: 'المندوب', key: 'user' },
    { label: 'المستلم', key: 'recipient' },
    { label: 'السائق', key: 'driver' },
    { label: 'الفرع', key: 'client_branch' },
    { label: 'المصدر', key: 'origin_city' },
    { label: 'الوجهة', key: 'destination_city' },
    { label: 'تاريخ التحميل', key: 'loading_at' },
    { label: 'حالة الشحنة', key: 'status' },
  ];

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'قيد الشحن':
        return 'bg-[#B3E5BD]';
      case 'متأخرة':
        return 'bg-[#FEDE9A]';
      case 'تم التوصيل':
        return 'bg-[#E6E6E6]';
      case 'ملغية':
        return 'bg-[#CD2026]';
      case 'مرتجعة':
        return 'bg-[#F8D3D4]';
      case 'مكتملة':
        return 'bg-[#2E853F]';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'قيد الشحن':
      case 'متأخرة':
        return 'text-[#071309]';
      case 'تم التوصيل':
        return 'text-[#333333]';
      case 'ملغية':
        return 'text-[#F8D3D4]';
      case 'مرتجعة':
        return 'text-[#CD2026]';
      case 'مكتملة':
        return 'text-[#B3E5BD]';
      default:
        return 'text-[#071309]';
    }
  };

  return (
    <div className='w-full overflow-x-auto min-h-[40vh]'>
      <table className='bg-[#FCFCFC] w-full table-auto'>
        <thead>
          <tr className='border-b-2 border-[#CCCCCC] relative'>
            {tableHeading.map((col, index) => (
              <th
                key={col.key}
                className={tableRowStyles + ' relative'}
              >
                <div
                  className={`flex items-center gap-1 ${
                    index === tableHeading.length - 1 && 'ms-4'
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
                        isPickupDate={col.key === 'loading_at'}
                        loadingAtSort={loadingAtSort}
                        setLoadingAtSort={setLoadingAtSort}
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
          {paginatedData.map((shipment: any, index: any) => (
            <tr
              key={shipment.id}
              className={`rounded-lg ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
            >
              <button
                key={index}
                onClick={() => {
                  navigate(`/shipments/shipment-details/${shipment.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ display: 'contents' }}
              >
                <td className={tableRowStyles}>{shipment.id}</td>
                <td className={tableRowStyles}>{shipment.user}</td>
                <td className={tableRowStyles}>{shipment.recipient}</td>
                <td className={tableRowStyles}>{shipment.driver}</td>
                <td className={tableRowStyles}>{shipment.client_branch}</td>
                <td className={tableRowStyles}>{shipment.origin_city}</td>
                <td className={tableRowStyles}>{shipment.destination_city}</td>
                <td className={tableRowStyles}>
                  {(shipment.loading_at && formatDate(shipment.loading_at)) || '-'}
                </td>
                <td className={tableRowStyles}>
                  <span
                    className={`py-2 text-center font-medium inline-block rounded-md w-36 text-sm ${getStatusColor(
                      shipment.status,
                    )} ${getStatusBgColor(shipment.status)}`}
                  >
                    {shipment.status}
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

export default ShipmentsTable;
