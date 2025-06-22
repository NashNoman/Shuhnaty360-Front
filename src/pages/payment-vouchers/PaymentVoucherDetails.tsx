// d:\.Projects\Shuhnaty360-Front\src\pages\payment-vouchers\PaymentVoucherDetails.tsx
import { usePaymentVoucherQuery } from "@/api/payment-vouchers.api";
import { useShipmentQuery } from "@/api/shipments.api";
import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { formatDate } from "@/utils/formatDate";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import InfoSection from "./components/InfoSection";
import PrintableVoucher from "./components/PrintableVoucher";

const PaymentVoucherDetails = () => {
  const { paymentVoucherId } = useParams<{ paymentVoucherId: string }>();

  const {
    data: voucherData,
    isLoading: isVoucherLoading,
    error: voucherError,
    refetch: refetchVoucher,
  } = usePaymentVoucherQuery(paymentVoucherId);

  const voucher = voucherData?.data;
  const shipmentId = voucherData?.data.shipment?.id;

  const {
    data: shipmentData,
    isLoading: isShipmentLoading,
    error: shipmentError,
    refetch: refetchShipment,
  } = useShipmentQuery(shipmentId);

  const shipment = shipmentData?.data;

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  if (voucherError || shipmentError) {
    return (
      <ErrorContainer
        error={voucherError || shipmentError}
        onRetry={() => {
          if (voucherError) refetchVoucher();
          if (shipmentError) refetchShipment();
        }}
        defaultMessage="حدث خطأ أثناء جلب بيانات سند الصرف"
      />
    );
  }

  const isLoading = isVoucherLoading || isShipmentLoading;

  const voucherDetails: { label: string; value: string | number }[] = [
    { label: "رقم السند", value: voucher?.id || "-" },
    {
      label: "التاريخ",
      value: voucher?.created_at ? formatDate(voucher.created_at) : "-",
    },
    { label: "اسم السائق", value: shipment?.driver?.name || "-" },
    { label: "المصدر", value: shipment?.origin_city?.ar_city || "-" },
    { label: "الوجهة", value: shipment?.destination_city?.ar_city || "-" },
    { label: "المرسل", value: shipment?.client?.name || "-" },
    { label: "المستلم", value: shipment?.recipient?.name || "-" },
    { label: "رقم الشحنة", value: voucher?.shipment?.id || "-" },
    {
      label: "منشئ الشحنة",
      value: `${shipment?.user?.first_name} ${shipment?.user?.last_name}`,
    },
    {
      label: "منشئ السند",
      value: `${voucher?.created_by?.first_name} ${voucher?.created_by?.last_name}`,
    },
  ];

  const costDetails = [
    { label: "الأجرة", value: `${voucher?.fare || 0} ر.س` },
    { label: "الزيادة", value: `${voucher?.premium || 0} ر.س` },
    { label: "عدد الأيام", value: voucher?.days_stayed || 0 },
    { label: "تكلفة كل يوم", value: `${voucher?.stay_cost || 0} ر.س` },
    { label: "الرجعة", value: `${voucher?.fare_return || 0} ر.س` },
    { label: "الخصم", value: `${voucher?.deducted || 0} ر.س` },
  ];

  const totalCost = [
    { label: "الإجمالي", value: `${voucher?.total_cost || 0} ر.س` },
  ];

  return (
    <>
      {isLoading && <PageLoader />}
      {voucher && shipment && (
        <>
          <div className="hidden">
            <PrintableVoucher
              ref={printRef}
              voucher={voucher}
              shipment={shipment}
            />
          </div>
          <div className="border border-[#DD7E1F] rounded-lg mx-4 bg-[#FCFCFC] p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">تفاصيل سند الصرف</h1>
              <button
                onClick={handlePrint}
                className="bg-[#DD7E1F] text-white px-4 py-2 rounded-lg"
              >
                طباعة
              </button>
            </div>
            <InfoSection title="تفاصيل السند" data={voucherDetails} />
            <InfoSection title="تفاصيل التكلفة" data={costDetails} />
            <div className="pt-4 mt-4">
              <InfoSection title="الإجمالي" data={totalCost} gridCols={1} />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold">ملاحظات:</h3>
              <p>{voucher.note || "-"}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentVoucherDetails;
