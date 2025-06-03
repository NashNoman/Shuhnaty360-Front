import { useNavigate } from "react-router-dom";
import { ShipmentSerializerList } from "../../Api";
import { formatDate } from "../utils/formatDate";
import { Table, TableCell, TableRow } from "./ui/Table";

const tableColumns = [
  { label: "رقم الشحنة", key: "id" },
  { label: "المصدر", key: "origin_city" },
  { label: "الوجهة", key: "destination_city" },
  { label: "رقم الشحنة", key: "tracking_number" },
  { label: "المستلم", key: "recipient" },
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

type EntityShipmentsTableProps = {
  data: ShipmentSerializerList[];
  isLoading: boolean;
};

const EntityShipmentsTable = ({
  data,
  isLoading,
}: EntityShipmentsTableProps) => {
  const navigate = useNavigate();
  return (
    <Table dataCount={data.length} columns={tableColumns} isLoading={isLoading}>
      {data.map((shipment, index) => (
        <TableRow
          key={`${shipment.id}${index}`}
          index={index}
          onClick={() => navigate("/shipments/shipment-details/" + shipment.id)}
        >
          <TableCell>{shipment.id}</TableCell>
          <TableCell>{shipment.origin_city?.ar_city}</TableCell>
          <TableCell>{shipment.destination_city?.ar_city}</TableCell>
          <TableCell>{shipment.tracking_number}</TableCell>
          <TableCell>{shipment.recipient?.name}</TableCell>
          <TableCell className="text-center flex items-center justify-center gap-4">
            {shipment.loading_date && formatDate(shipment.loading_date)}
          </TableCell>
          <TableCell>
            <span
              className={`py-2 text-center font-medium inline-block rounded-md w-36 text-sm ${
                shipment.status?.name_ar &&
                getStatusColor(shipment.status?.name_ar)
              } ${shipment.status?.name_ar && getStatusBgColor(shipment.status.name_ar)}`}
            >
              {shipment.status?.name_ar || "-"}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default EntityShipmentsTable;
