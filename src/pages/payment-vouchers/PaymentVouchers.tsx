import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usePaymentVouchersInfinityQuery } from "../../api/payment-vouchers.api";
import { Table, TableCell, TableRow } from "../../components/ui/Table";

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
    key: "client",
    label: "العميل",
  },
  {
    key: "company_branch",
    label: "الفرع",
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
    key: "actions",
    label: "",
  },
];

const PaymentVouchers = () => {
  const navigate = useNavigate();

  const { data, isFetching, error, hasNextPage, ref, fetchNextPage } =
    usePaymentVouchersInfinityQuery();

  return (
    <>
      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <button
            className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
            onClick={() => {
              navigate("/payment-vouchers/add");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            إضافة سند صرف
            <FiPlus size={24} />
          </button>
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
                  <TableCell>{item.shipment}</TableCell>
                  <TableCell>{item.shipment}</TableCell>
                  <TableCell>{item.shipment}</TableCell>
                  <TableCell>{item.shipment}</TableCell>
                  <TableCell>{item.shipment}</TableCell>
                  <TableCell>{`${item.created_by?.first_name} ${item.created_by?.last_name}`}</TableCell>
                  <TableCell>{item.shipment}</TableCell>
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
