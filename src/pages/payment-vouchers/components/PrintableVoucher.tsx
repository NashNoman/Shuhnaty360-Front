import { formatDate } from "@/utils/formatDate";
import { PaymentVoucherDetail, ShipmentSerializerDetail } from "Api";
import { toArabicWord } from "number-to-arabic-words/dist/index-node";
import { forwardRef } from "react";

interface PrintableVoucherProps {
  voucher: PaymentVoucherDetail;
  shipment: ShipmentSerializerDetail;
}

const PrintableVoucher = forwardRef<HTMLDivElement, PrintableVoucherProps>(
  ({ voucher, shipment }, ref) => {
    const totalInWords = toArabicWord(voucher.total_cost || 0);
    // const riyals = Math.floor(Number(voucher.total_cost) || 0);
    // const halalas = Math.round(
    //   ((Number(voucher.total_cost) || 0) - riyals) * 100,
    // );

    return (
      <>
        <style type="text/css" media="print">
          {`
              @page {
                size: landscape;
                margin: 0;
              }
              body.is-printing #root {
                display: none !important;
              }

              #waybill-printable {
              display: block;
              }
          `}
        </style>
        <div
          ref={ref}
          id="waybill-printable"
          className="m-0 hidden bg-white p-4 font-Almarai text-[#1a1a1a]"
        >
          <div
            id="printable-voucher"
            className="border-2 border-[#DD7E1F] rounded-lg p-4 w-full"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              {/* Left Section */}
              <div className="text-center font-Rubik pt-10 flex-1">
                <h2 className="text-2xl text-[#DD7E1F]">
                  Aljeed Transportation Est.
                </h2>
                <p className="text-xl">
                  {shipment.user?.company_branch.branch_name_en} Branch
                </p>
                <p className="text-lg font-bold mt-4 text-[#DD7E1F]">
                  {voucher.shipment?.client_invoice_number}
                </p>
              </div>

              {/* Center Section */}
              <div className="flex flex-col items-center mx-4">
                <img
                  src={
                    shipment.user?.company_branch?.company?.company_logo ||
                    "/src/assets/images/truck-Logo.svg"
                  }
                  alt="logo"
                  className="w-36"
                />
                <div className="bg-[#DD7E1F] text-white px-6 py-1 mt-2 text-center">
                  <h1 className="text-lg font-bold">سند صرف</h1>
                </div>
              </div>

              {/* Right Section */}
              <div className="font-Almarai flex-1 pt-10 text-center">
                <div className="text-[#DD7E1F] text-2xl">
                  مؤسسة الجيد للنقليات
                </div>
                <div className="text-xl">
                  فرع{" "}
                  <span>{shipment.user?.company_branch.branch_name_ar}</span>
                </div>
                {/* <div className="mt-2 px-2 py-1 rounded-lg bg-[#DD7E1F] text-[#FCFCFC]">
                  رقم الشحنة: <span>{shipment.id}</span>
                </div> */}
              </div>
              {/* <div className="flex justify-start items-center mt-2 text-sm">
                  <div className="flex items-center">
                    <div className="border border-black w-24 h-6 flex justify-center items-center font-bold">
                      {riyals}
                    </div>
                    <span className="mx-2">ريال</span>
                    <div className="border border-black w-12 h-6 flex justify-center items-center font-bold">
                      {halalas}
                    </div>
                    <span className="mr-2">هللة</span>
                  </div>
                </div> */}
            </div>

            {/* Date Fields */}
            <div dir="rtl" className="flex justify-between mt-2 text-sm">
              <p className="font-Rubik">
                <span>
                  {voucher.created_at ? formatDate(voucher.created_at) : "-"}
                </span>
                <span className="mr-1">م</span>
                <span className="ml-2">: الموافق</span>
              </p>
              <p>
                <span className="ml-2">: التاريخ</span>
                <span>...............</span>
                <span className="mr-1">١٤هـ</span>
              </p>
            </div>

            {/* Body Fields */}
            <div dir="rtl" className="mt-4 space-y-2 text-base">
              <div className="flex items-baseline">
                <span className="whitespace-nowrap font-bold w-28">
                  ادفعوا لأمر:
                </span>
                <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                  {shipment.driver?.name}
                </span>
              </div>
              <div className="flex items-baseline bg-gray-200 p-2 rounded">
                <span className="whitespace-nowrap font-bold w-28">
                  مبلغ وقدره:
                </span>
                <span className="w-full mx-2 text-center font-semibold">
                  {totalInWords} ريال سعودي فقط لا غير
                </span>
              </div>

              {/* Financial Details Table */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-2 text-sm">
                <div className="flex justify-between border-b border-dotted">
                  <span className="font-bold">مبلغ الأجرة:</span>
                  <span>{voucher.fare || 0} ر.س</span>
                </div>
                <div className="flex justify-between border-b border-dotted">
                  <span className="font-bold">مبلغ الزيادة:</span>
                  <span>{voucher.premium || 0} ر.س</span>
                </div>
                <div className="flex justify-between border-b border-dotted">
                  <span className="font-bold">إيجار رجعة:</span>
                  <span>{voucher.fare_return || 0} ر.س</span>
                </div>
                <div className="flex justify-between border-b border-dotted">
                  <span className="font-bold">مبلغ اليومية:</span>
                  <span>{voucher.stay_cost || 0} ر.س</span>
                </div>
                <div className="flex justify-between border-b border-dotted">
                  <span className="font-bold">الخصم:</span>
                  <span>{voucher.deducted || 0} ر.س</span>
                </div>
                <div className="flex justify-between border-b border-dotted bg-gray-100 font-bold">
                  <span className="font-bold">الإجمالي:</span>
                  <span>{voucher.total_cost || 0} ر.س</span>
                </div>
              </div>

              <div className="flex items-baseline pt-2">
                <span className="whitespace-nowrap font-bold w-28">
                  وذلك مقابل:
                </span>
                <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                  {voucher.note || "................"}
                </span>
              </div>
              <div className="flex justify-between space-x-4 pt-2">
                <div className="flex items-baseline w-1/2">
                  <span className="whitespace-nowrap font-bold">
                    رقم كشف التحميل:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {"................"}
                  </span>
                </div>
                <div className="flex items-baseline w-1/2">
                  <span className="whitespace-nowrap font-bold">
                    رقم الشحنة:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {voucher.shipment?.client_invoice_number ||
                      "................"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              dir="rtl"
              className="flex justify-around mt-12 pt-4 text-center text-sm"
            >
              <div>
                <p className="font-bold">المستلم</p>
                <p className="mt-2 text-xs">{shipment.driver?.name}</p>
                <p className="mt-8">..........................</p>
              </div>
              <div>
                <p className="font-bold">المندوب</p>
                <p className="mt-2 text-xs">
                  {voucher.created_by
                    ? `${voucher.created_by.first_name} ${voucher.created_by.last_name}`
                    : "-"}
                </p>
                <p className="mt-8">..........................</p>
              </div>
              <div>
                <p className="font-bold">المحاسب</p>
                <p className="mt-2 text-xs">&nbsp;</p>
                <p className="mt-8">..........................</p>
              </div>
              <div>
                <p className="font-bold">الاعتماد</p>
                <p className="mt-2 text-xs">&nbsp;</p>
                <p className="mt-8">..........................</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

export default PrintableVoucher;
