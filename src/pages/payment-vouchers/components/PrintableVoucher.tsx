import { formatDate } from "@/utils/formatDate";
import { PaymentVoucherDetail, ShipmentSerializerDetail } from "Api";
import { toArabicWord } from "number-to-arabic-words/dist/index-node";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../../../../config";

interface PrintableVoucherProps {
  voucher: PaymentVoucherDetail;
  shipment: ShipmentSerializerDetail;
}

const PrintableVoucher = forwardRef<HTMLDivElement, PrintableVoucherProps>(
  ({ voucher, shipment }, ref) => {
    const totalInWords = toArabicWord(voucher.total_cost || 0);
    const location = useLocation();

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
              <div className="text-center font-Rubik pt-6 flex-1">
                <h2 className="text-2xl text-[#DD7E1F]">
                  Aljeed Transportation Est.
                </h2>
                <p className="text-xl">
                  {shipment.user?.company_branch.branch_name_en} Branch
                </p>
                <p className="text-lg font-bold mt-10 text-[#DD7E1F]">
                  {voucher.id}
                </p>
              </div>

              {/* Center Section */}
              <div className="flex flex-col relative items-center mx-4">
                <img
                  src={
                    shipment.user?.company_branch?.company?.company_logo ||
                    "/src/assets/images/truck-Logo.svg"
                  }
                  alt="logo"
                  className="w-36"
                />

                <div className="bg-[#DD7E1F] relative text-white px-6 py-1 mt-2 text-center">
                  <h1 className="text-lg font-bold">سند صرف</h1>
                  <div className="absolute -top-5 -right-full flex gap-2 translate-x-1/2">
                    <div className="text-black">
                      <span className="mb-1">ريال سعودي</span>
                      <div className="border-1 p-1 text-center w-32 border-[#DD7E1F]">
                        {voucher.total_cost}
                      </div>
                    </div>
                    <div className="text-black">
                      <span className="mb-0.5">هللة</span>
                      <div className="border-1 p-1 border-[#DD7E1F]">
                        {voucher.total_cost}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="font-Almarai flex-1 pt-6 text-center">
                <div className="text-[#DD7E1F] text-2xl">
                  مؤسسة الجيد للنقليات
                </div>
                <div className="text-xl">
                  فرع{" "}
                  <span>{shipment.user?.company_branch.branch_name_ar}</span>
                </div>
              </div>
            </div>

            {/* Date Fields */}
            <div dir="rtl" className="flex justify-between mt-2 text-sm">
              <p className="font-Rubik">
                <span className="ml-1">الموافق:</span>
                <span>
                  {voucher.created_at ? formatDate(voucher.created_at) : "-"}
                </span>
                <span className="mr-1">م</span>
              </p>
              <p>
                <span className="ml-1">التاريخ:</span>
                <span>...............</span>
                <span className="mr-1">١٤هـ</span>
              </p>
            </div>

            <hr className="border-0 border-t-2 border-solid border-[#666] mt-2 mb-6" />

            {/* Body Fields */}
            <div dir="rtl" className="mt-4 space-y-2 text-base">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-baseline">
                  <span className="whitespace-nowrap font-bold w-28">
                    اسم السائق:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {shipment.driver?.name || "................"}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="whitespace-nowrap font-bold w-28">
                    نوع السيارة:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {shipment.truck_type?.name_ar || "................"}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="whitespace-nowrap font-bold w-28">
                    المرسل:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {shipment.client?.name || "................"}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="whitespace-nowrap font-bold w-28">
                    اسم المستلم:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {shipment.recipient?.name || "................"}
                  </span>
                </div>
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
                  <span>
                    {Number(voucher.stay_cost) * Number(voucher.days_stayed) ||
                      0}{" "}
                    ر.س
                  </span>
                </div>
                <div className="flex justify-between border-b border-dotted">
                  <span className="font-bold">الخصم:</span>
                  <span>{voucher.deducted || 0} ر.س</span>
                </div>
                <div className="flex justify-between border-b border-dotted font-bold">
                  <span className="font-bold">الإجمالي:</span>
                  <span>{voucher.total_cost || 0} ر.س</span>
                </div>
              </div>

              <div className="flex items-baseline pt-2">
                <span className="whitespace-nowrap font-bold w-28">
                  وذلك مقابل:
                </span>
                <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                  {`تحميل شحنة من ${shipment?.origin_city?.ar_city || "-"} إلى ${shipment?.destination_city?.ar_city || "-"}`}
                </span>
              </div>
              <div className="flex justify-between space-x-4 pt-2">
                <div className="flex items-baseline w-1/2">
                  <span className="whitespace-nowrap font-bold">
                    رقم كشف التحميل:
                  </span>
                  <span className="w-full border-b border-dotted border-gray-500 mx-2 text-center font-semibold">
                    {voucher.shipment?.id || "................"}
                  </span>
                </div>
                <div className="flex items-baseline w-1/2">
                  <span className="whitespace-nowrap font-bold">
                    رقم فاتورة المستلم:
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
              className="flex justify-around mt-12 p2-4 text-center text-sm"
            >
              <div>
                <p className="font-bold">المستلم</p>
                <p className="mt-2 text-xs">
                  {shipment.recipient?.name || shipment.driver?.name}
                </p>
                <p className="mt-8">..........................</p>
              </div>
              <div>
                <p className="font-bold">المندوب</p>
                <p className="mt-2 text-xs">
                  {`${shipment.user?.first_name} ${shipment.user?.last_name}`}
                </p>
                <p className="mt-8">..........................</p>
              </div>
              <div className="text-center">
                <div className="border-2 border-[#DD7E1F] p-1 w-fit m-auto">
                  <QRCodeSVG
                    value={`${baseURL}${location.pathname}`}
                    size={80}
                    bgColor="#ffffff"
                    fgColor="#212121"
                    level="H"
                    includeMargin={false}
                  />
                </div>
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
