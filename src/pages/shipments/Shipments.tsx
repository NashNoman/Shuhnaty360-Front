import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { flatMap } from "lodash";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import { getShipmentsList } from "../../api/shipments.api";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { ShipmentListItem } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { getUrlParams } from "../../utils/utils";

const tableColumns = [
  { label: "رقم الشحنة", key: "id" },
  { label: "المندوب", key: "user" },
  { label: "المستلم", key: "recipient" },
  { label: "السائق", key: "driver" },
  { label: "الفرع", key: "client_branch" },
  { label: "المصدر", key: "origin_city" },
  { label: "الوجهة", key: "destination_city" },
  { label: "تاريخ التحميل", key: "loading_at" },
  { label: "حالة الشحنة", key: "status" },
];

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "قيد الشحن":
      return "bg-[#B3E5BD]";
    case "متأخرة":
      return "bg-[#FEDE9A]";
    case "تم التوصيل":
      return "bg-[#E6E6E6]";
    case "ملغية":
      return "bg-[#CD2026]";
    case "مرتجعة":
      return "bg-[#F8D3D4]";
    case "مكتملة":
      return "bg-[#2E853F]";
    default:
      return "bg-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "قيد الشحن":
    case "متأخرة":
      return "text-[#071309]";
    case "تم التوصيل":
      return "text-[#333333]";
    case "ملغية":
      return "text-[#F8D3D4]";
    case "مرتجعة":
      return "text-[#CD2026]";
    case "مكتملة":
      return "text-[#B3E5BD]";
    default:
      return "text-[#071309]";
  }
};

const selectMenuOptions = [
  { label: "الكل", value: "all" },
  { label: "قيد الشحن", value: "in-shipping" },
  { label: "متأخرة", value: "delayed" },
  { label: "تم التوصيل", value: "delivered" },
  { label: "مكتملة", value: "completed" },
  { label: "تم الإلغاء", value: "cancelled" },
  { label: "تم الإرجاع", value: "returned" },
];

const routeStatusMap: Record<string, string> = {
  all: "الكل",
  delivered: "تم التوصيل",
  completed: "مكتملة",
  "in-shipping": "قيد الشحن",
  delayed: "متأخرة",
  cancelled: "تم الإلغاء",
  returned: "تم الإرجاع",
};

const Shipments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedShipmentStatus, setSelectedShipmentStatus] = useState("الكل");
  const [searchValue, setSearchValue] = useState("");

  const { ref, inView } = useInView();

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["shipments"],
    queryFn: async ({ pageParam }) =>
      await getShipmentsList({ page: pageParam }),
    initialPageParam: 1,
    getPreviousPageParam: (lastPage) =>
      getUrlParams(lastPage.data.previous)?.page || undefined,
    getNextPageParam: (lastPage) =>
      getUrlParams(lastPage.data.next)?.page || undefined,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  const shipmentsData = flatMap(
    data?.pages || [],
    "data.results",
  ) as ShipmentListItem[];

  const pathParts = location.pathname.split("/").filter(Boolean);
  const lastPath = pathParts[pathParts.length - 1];
  const statusFromRoute = routeStatusMap[lastPath] || "الكل";

  let filteredShipments = shipmentsData;
  if (statusFromRoute !== "الكل") {
    filteredShipments = shipmentsData.filter(
      (shipment) => shipment.status?.name_ar === statusFromRoute,
    );
  }

  let rowIndex = 0;

  return (
    <div className="p-4">
      <div
        className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
      >
        <button
          className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
          onClick={() => {
            navigate("/shipments/add-shipment");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          إضافة شحنة
          <FiPlus size={24} />
        </button>
        <SearchInput
          value={searchValue}
          onChange={(e: any) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="shadow-xl rounded-3xl px-8 py-4">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-base md:text-xl font-bold">قائمة الشحنات</h1>
          {statusFromRoute === "الكل" && (
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedShipmentStatus}
              setSelectedItem={setSelectedShipmentStatus}
            />
          )}
        </div>
        <Table
          className="w-full overflow-x-auto"
          columns={tableColumns}
          isLoading={isFetching || hasNextPage}
          dataCount={filteredShipments?.length}
        >
          {filteredShipments &&
            filteredShipments.map((shipment) => (
              <TableRow
                key={`${shipment.id}${rowIndex}`}
                index={rowIndex++}
                onClick={() =>
                  navigate("/shipments/shipment-details/" + shipment.id)
                }
              >
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.user?.username || "-"}</TableCell>
                <TableCell>{shipment.recipient?.name || "-"}</TableCell>
                <TableCell>{shipment.driver?.name || "-"}</TableCell>
                <TableCell>{shipment.client_branch?.name || "-"}</TableCell>
                <TableCell>{shipment.origin_city.ar_city}</TableCell>
                <TableCell>{shipment.destination_city.ar_city}</TableCell>
                <TableCell className="text-center flex items-center justify-center gap-4">
                  {(shipment.loading_at && formatDate(shipment.loading_at)) ||
                    "-"}
                </TableCell>
                <TableCell>
                  <span
                    className={`py-2 text-center font-medium inline-block rounded-md w-36 text-sm ${getStatusColor(
                      shipment.status.name_ar,
                    )} ${getStatusBgColor(shipment.status.name_ar)}`}
                  >
                    {shipment.status.name_ar}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <div ref={ref} className="h-0" />
      </div>
    </div>
  );
};

export default Shipments;
