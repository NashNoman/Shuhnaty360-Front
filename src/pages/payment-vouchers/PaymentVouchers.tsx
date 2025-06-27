import FiltersPopover from "@/components/searchInput/FiltersPopover";
import SearchInput from "@/components/searchInput/SearchInput";
import { useRef, useState } from "react";
import { FiDownload, FiPlus } from "react-icons/fi";
import { exportToExcel } from "@/utils/exportToExcel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import {
  PaymentVoucherFilters as FilterType,
  usePaymentVouchersInfinityQuery,
} from "../../api/payment-vouchers.api";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { PaymentVoucherFilters } from "./components/PaymentVoucherFilters";

const tableColumns = [
  {
    key: "id",
    label: "(ID)",
  },
  {
    key: "driver",
    label: "السائق",
  },
  {
    key: "shipment",
    label: "رقم الشحنة",
  },
  {
    key: "recipient",
    label: "المستلم",
  },
  {
    key: "client_invoice_number",
    label: "رقم الفاتورة",
  },
  {
    key: "origin_city",
    label: "المصدر",
  },
  {
    key: "destination_city",
    label: "الوجهة",
  },
  {
    key: "user",
    label: "المندوب",
  },
  {
    key: "branch",
    label: "الفرع",
  },
  {
    key: "total_cost",
    label: "الإجمالي",
  },
  {
    key: "status",
    label: "الحالة",
  },
];

const PaymentVouchers = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue] = useDebounce(searchParams.get("search"), 500);
  const filtersPopoverRef = useRef<{
    open: boolean;
    setOpen: (open: boolean) => void;
  }>(null);

  const [filters, setFilters] = useState<FilterType>({});
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const params = { search: debouncedValue || undefined, ...filters };

  const { data, isFetching, hasNextPage, ref, error, fetchNextPage } =
    usePaymentVouchersInfinityQuery(params);

  const handleExportToExcel = () => {
    if (!data?.items) return;

    // Map the items to match exactly what's shown in the table
    const vouchersDataForExport = data.items.map((item) => ({
      ID: item.id || "-",
      السائق: item.driver || "-",
      "رقم الشحنة": item.shipment || "-",
      المستلم: item.recipient || "-",
      "رقم الفاتورة": item.client_invoice_number || "-",
      المصدر: item.origin_city || "-",
      الوجهة: item.destination_city || "-",
      المندوب: item.created_by || "-",
      الفرع: item.client_branch || "-",
      الإجمالي: item.total_cost ? `${item.total_cost} ر.س` : "-",
      الحالة: item.is_approved ? "معتمد" : "غير معتمد",
    }));

    exportToExcel(
      vouchersDataForExport,
      `سندات_صرف_${new Date().toISOString().split("T")[0]}`,
    );
  };

  return (
    <>
      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("add")}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
            >
              <span>إضافة سند صرف</span>
              <FiPlus size={20} />
            </button>
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              title="تصدير إلى إكسل"
            >
              <FiDownload size={20} />
              <span className="hidden sm:inline">تصدير</span>
            </button>
          </div>
          <SearchInput
            value={searchParams.get("search") || ""}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  if (e.target.value.trim()) {
                    prev.set("search", e.target.value.trim());
                  } else {
                    prev.delete("search");
                  }
                  return prev;
                },
                { replace: true },
              )
            }
            suffixIcon={
              <FiltersPopover
                ref={filtersPopoverRef}
                activeFilterCount={activeFilterCount}
              >
                <PaymentVoucherFilters
                  initialFilters={filters}
                  onApply={(filters) => {
                    setFilters(filters);
                    filtersPopoverRef.current?.setOpen(false);
                  }}
                  onClear={() => {
                    setFilters({});
                    filtersPopoverRef.current?.setOpen(false);
                  }}
                />
              </FiltersPopover>
            }
          />
        </div>

        <div className="shadow-xl rounded-3xl bg-white px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl text-nowrap font-bold">
              قائمة سندات الصرف
            </h1>
          </div>

          <Table
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={data?.items?.length}
            error={error}
            onRetry={fetchNextPage}
            defaultMessage="حدث خطاء اثناء جلب بيانات السندات"
          >
            {data?.items &&
              data.items.map((item, index) => (
                <TableRow
                  key={item.id}
                  index={index}
                  onClick={() =>
                    navigate("/payment-vouchers/details/" + item.id)
                  }
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.driver}</TableCell>
                  <TableCell>{item.shipment}</TableCell>
                  <TableCell>{item.recipient}</TableCell>
                  <TableCell>{item.client_invoice_number}</TableCell>
                  <TableCell>{item.origin_city}</TableCell>
                  <TableCell>{item.destination_city}</TableCell>
                  <TableCell>{item.created_by}</TableCell>
                  <TableCell>{item.client_branch}</TableCell>
                  <TableCell className="text-center">
                    {item.total_cost} ر.س
                  </TableCell>
                  <TableCell>
                    {item.is_approved ? (
                      <span className="py-2 text-center font-medium inline-block rounded-md w-20 text-sm bg-green-600 text-[#FCFCFC]">
                        معتمد
                      </span>
                    ) : (
                      <span className="py-2 text-center font-medium inline-block rounded-md w-20 text-sm bg-[#dd1f1f] text-[#FCFCFC]">
                        غير معتمد
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </Table>
          <div ref={ref} className="h-0" />
        </div>
      </div>
    </>
  );
};

export default PaymentVouchers;
