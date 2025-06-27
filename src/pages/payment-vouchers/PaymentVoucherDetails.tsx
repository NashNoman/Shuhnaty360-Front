// d:\.Projects\Shuhnaty360-Front\src\pages\payment-vouchers\PaymentVoucherDetails.tsx
import { usePaymentVoucherQuery } from "@/api/payment-vouchers.api";
import { useShipmentQuery } from "@/api/shipments.api";
import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

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
    onBeforePrint: async () => document.body.classList.add("is-printing"),
    onAfterPrint: () => document.body.classList.remove("is-printing"),
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

  const details = [
    // First Column
    { label: "رقم الشحنة", value: voucher?.shipment?.id || "-" },
    { label: "اسم السائق", value: voucher?.shipment?.driver?.name || "-" },
    {
      label: "نوع السيارة",
      value: voucher?.shipment?.truck_type?.name_ar || "-",
    },
    { label: "المرسل", value: voucher?.shipment?.client?.name || "-" },
    {
      label: "رقم فاتورة المرسل",
      value: voucher?.shipment?.client_invoice_number || "-",
    },
    { label: "اسم المستلم", value: voucher?.shipment?.recipient?.name || "-" },
    {
      label: "مدينة التحميل",
      value: voucher?.shipment?.origin_city?.ar_city || "-",
    },

    // Second Column
    {
      label: "مدينة التنزيل",
      value: voucher?.shipment?.destination_city?.ar_city || "-",
    },
    { label: "المجموع", value: `${voucher?.total_cost || 0} ر.س` },
    { label: "المستلم", value: voucher?.receiver_name || "-" },
    { label: "المندوب", value: voucher?.created_by || "-" },
    { label: "المحاسب", value: voucher?.approved_by || "-" },
    {
      label: "حالة الاعتماد",
      value: voucher?.is_approved ? "معتمد" : "غير معتمد",
      className: voucher?.is_approved ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <>
      {isLoading && <PageLoader />}
      {voucher && shipment && (
        <>
          <PrintableVoucher
            ref={printRef}
            voucher={voucher}
            shipment={shipment}
          />

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {details.slice(0, 7).map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 border-b"
                  >
                    <span className="text-gray-500 font-medium">
                      {detail.label}
                    </span>
                    <span className={detail.className || "font-semibold"}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {details.slice(7).map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 border-b"
                  >
                    <span className="text-gray-500 font-medium">
                      {detail.label}
                    </span>
                    <span className={detail.className || "font-semibold"}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentVoucherDetails;
