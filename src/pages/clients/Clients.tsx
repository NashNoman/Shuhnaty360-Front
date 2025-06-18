import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useClientsInfinityQuery } from "../../api/clients.api";
import locationIcon from "../../assets/images/location.svg";
import SearchInput from "../../components/searchInput/SearchInput";
import { Table, TableCell, TableRow } from "../../components/ui/Table";

const tableColumns = [
  {
    key: "id",
    label: "(ID)",
  },
  {
    key: "name",
    label: "اسم",
  },
  {
    key: "phone_number",
    label: "رقم الجوال",
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
  },
  {
    key: "address",
    label: "الموقع",
  },
];

const Clients = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const {
    data: clientsData,
    isFetching,
    hasNextPage,
    ref,
    error,
    fetchNextPage,
  } = useClientsInfinityQuery();

  return (
    <>
      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <button
            className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
            onClick={() => {
              navigate("/clients/add-client");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            إضافة عميل
            <FiPlus size={24} />
          </button>
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="shadow-xl rounded-3xl bg-white px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">قائمة العملاء</h1>
          </div>
          <Table
            className="w-full overflow-x-auto"
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={clientsData?.items?.length}
            error={error}
            onRetry={fetchNextPage}
            defaultMessage="حدث خطأ أثناء جلب بيانات العملاء"
          >
            {clientsData?.items &&
              clientsData.items.map((item, index) => (
                <TableRow
                  key={item.id}
                  index={index}
                  onClick={() => navigate("/clients/client-details/" + item.id)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-center flex items-center justify-center gap-4">
                    <img src={locationIcon} alt="location icon" />
                    <span className={`text-base text-[#DD7E1F]`}>
                      {item.address}
                    </span>
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

export default Clients;
