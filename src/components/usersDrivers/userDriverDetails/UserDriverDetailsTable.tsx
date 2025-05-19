/* eslint-disable @typescript-eslint/no-explicit-any */
const UserDriverDetailsTable = ({
  selectedOption,
  userShipmentsData,
  currentPage,
  itemsPerPage,
}: any) => {
  const filteredData = userShipmentsData.filter(
    (shipment: any) =>
      selectedOption === "الكل" || shipment.date === selectedOption
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tableRowStyles = "py-2 px-4 text-right text-nowrap";

  const getStatusBgColor = (label: string) => {
    switch (label) {
      case "تم التوصيل":
        return "bg-[#2E853F]";
    }
  };

  const getStatusColor = (label: string) => {
    switch (label) {
      case "تم التوصيل":
        return "text-[#FCFCFC]";
    }
  };

  const tableHeading = [
    "الرقم",
    "المصدر",
    "الوجهة",
    "رقم الشحنة",
    "تاريخ التحميل",
  ];

  return (
    <div className={`w-full overflow-x-auto`}>
      <table className={`bg-[#FCFCFC] w-full`}>
        <thead>
          <tr className="border-b-2 border-[#CCCCCC]">
            {tableHeading.map((item, index) => (
              <th key={index} className={tableRowStyles}>
                {item}
              </th>
            ))}
            <th className="py-2 px-4 text-center text-nowrap">حالة الشحنة</th>
          </tr>
        </thead>
        <div className="h-8"></div>
        <tbody className="font-Rubik text-base font-medium">
          {paginatedData.map((shipment: any, index: any) => (
            <tr
              key={shipment.id}
              className={`rounded-lg ${index % 2 === 0 && "bg-[#F2F2F2]"}`}
            >
              <button
                key={index}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ display: "contents" }}
              >
                <td className={tableRowStyles}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className={tableRowStyles}>{shipment.source}</td>
                <td className={tableRowStyles}>{shipment.destination}</td>
                <td className={tableRowStyles}>{shipment.shipmentNumber}</td>
                <td className={tableRowStyles}>{shipment.pickupDate}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`p-2.5 inline-block rounded-md w-44 text-sm ${getStatusColor(
                      shipment.label
                    )} ${getStatusBgColor(shipment.label)}`}
                  >
                    {shipment.label}
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

export default UserDriverDetailsTable;
