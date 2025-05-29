import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { getClientList } from "../../api/clients";
import locationIcon from "../../assets/images/location.svg";
import SearchInput from "../../components/searchInput/SearchInput";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { getUrlParams } from "../../utils/utils";

const tableColumns = [
  {
    key: "id",
    label: "(ID)",
    isFilterable: false,
  },
  {
    key: "name",
    label: "اسم",
    isFilterable: true,
  },
  {
    key: "phone_number",
    label: "رقم الجوال",
    isFilterable: true,
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
    isFilterable: true,
  },
  {
    key: "address",
    label: "الموقع",
    isFilterable: true,
  },
];

const Clients = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView } = useInView();

  const {
    data: clientsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["clients"],
    queryFn: getClientList,
    initialPageParam: 1,
    getPreviousPageParam: (lastPage) =>
      getUrlParams(lastPage.data.previous)?.page || undefined,
    getNextPageParam: (lastPage) =>
      getUrlParams(lastPage.data.next)?.page || undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  let rowIndex = 0;

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
        <div className="shadow-xl rounded-3xl px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">قائمة العملاء</h1>
          </div>
          <Table
            className="w-full overflow-x-auto"
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={clientsData?.pages?.length}
          >
            {clientsData?.pages &&
              clientsData.pages.map((page) =>
                page.data.results.map((client) => (
                  <TableRow
                    key={client.id}
                    index={rowIndex++}
                    onClick={() =>
                      navigate("/clients/client-details/" + client.id)
                    }
                  >
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.phone_number}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="text-center flex items-center justify-center gap-4">
                      <img src={locationIcon} alt="location icon" />
                      <span className={`text-base text-[#DD7E1F]`}>
                        {client.address}
                      </span>
                    </TableCell>
                  </TableRow>
                )),
              )}
          </Table>
          <div ref={ref} className="h-0" />
        </div>
      </div>
    </>
  );
};

export default Clients;
