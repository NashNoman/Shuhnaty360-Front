import { formatDate } from "@/utils/formatDate";
import { PaymentVoucherDetail, ShipmentSerializerDetail } from "Api";
import { toArabicWord } from "number-to-arabic-words/dist/index-node";
import React from "react";
import VoucherInfoRow from "./VoucherInfoRow";

interface PrintableVoucherProps {
  voucher: PaymentVoucherDetail;
  shipment: ShipmentSerializerDetail;
}

const PrintableVoucher = React.forwardRef<
  HTMLDivElement,
  PrintableVoucherProps
>(({ voucher, shipment }, ref) => {
  const totalInWords = toArabicWord(voucher.total_cost || 0);

  const voucherDetails = [
    { label: "رقم السند", value: voucher.id },
    {
      label: "التاريخ",
      value: voucher.created_at ? formatDate(voucher.created_at) : "-",
    },
    { label: "اسم السائق", value: shipment?.driver?.name },
    { label: "رقم الشحنة", value: voucher.shipment?.id },
  ];

  const costDetails = [
    { label: "الأجرة", value: `${voucher.fare || 0} ر.س` },
    { label: "الزيادة", value: `${voucher.premium || 0} ر.س` },
    { label: "عدد الأيام", value: voucher.days_stayed || 0 },
    { label: "تكلفة كل يوم", value: `${voucher.stay_cost || 0} ر.س` },
    { label: "الرجعة", value: `${voucher.fare_return || 0} ر.س` },
    { label: "الخصم", value: `${voucher.deducted || 0} ر.س` },
  ];

  return (
    <>
      <style type="text/css" media="print">
        {`
          @media print {
            @page{
              size: A4 landscape;
              margin: 0;
            }
          }
        `}
      </style>
      <div
        ref={ref}
        dir="rtl"
        id="waybill-printable"
        className="m-0 bg-white rounded-2xl p-4 font-Rubik text-[#1a1a1a] text-right"
      >
        {/* Header */}
        <div className="flex gap-0 text-left flex-row justify-between items-start ">
          <div className="font-light">
            <div className="font-bold">AL Jeed Transportation</div>
            <div>
              <span>{shipment.user?.company_branch.branch_name_en}</span> Branch
            </div>
            <div>
              <span>التاريخ:</span>{" "}
              {formatDate(new Date().toISOString().split("T")[0])}
            </div>
          </div>
          <div>
            <img
              src={"/src/assets/images/truck-Logo.svg"}
              alt="logo"
              className="w-24"
            />
          </div>
          <div className="font-Almarai text-right">
            <div className="font-bold">مؤسسة الجيد للنقليات</div>
            <div>
              فرع <span>{shipment.user?.company_branch.branch_name_ar}</span>
            </div>
            <div className="mt-2 px-2 py-1 rounded-lg bg-[#DD7E1F] text-[#FCFCFC]">
              رقم السند: <span>{voucher.id}</span>
            </div>
          </div>
        </div>
        <hr className="border-0 border-t-2 border-solid border-[#666] mt-2 mb-6" />

        {/* Title */}
        <div className="text-center font-Almarai font-bold text-lg mb-6">
          سند صرف
          <div className="font-semibold text-base">Payment Voucher</div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <div className="font-Almarai font-bold text-lg mb-1">
              تفاصيل السند
            </div>
            {voucherDetails.map((row, index) => (
              <VoucherInfoRow key={index} label={row.label} value={row.value} />
            ))}
          </div>
          <div className="bg-[#F2F2F2] p-2 rounded-lg print-bg-gray">
            <div className="font-Almarai font-bold text-lg mb-1">
              تفاصيل التكلفة
            </div>
            {costDetails.map((row, index) => (
              <VoucherInfoRow key={index} label={row.label} value={row.value} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-dashed border-gray-400 pt-4 mt-6">
          <div className="text-lg font-bold">
            <strong>الإجمالي:</strong> {voucher.total_cost || 0} ر.س (
            {totalInWords} ريال سعودي)
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold">ملاحظات:</h3>
          <p>{voucher.note || "-"}</p>
        </div>

        <div className="flex justify-between mt-16 pt-8 border-t-2 border-gray-300">
          <div>
            <p className="font-bold">المستلم</p>
            <p>التوقيع: ..........................</p>
          </div>
          <div>
            <p className="font-bold">المحاسب</p>
            <p>التوقيع: ..........................</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default PrintableVoucher;
