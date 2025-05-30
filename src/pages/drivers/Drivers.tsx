import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { getDriversList } from "../../api/drivers";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { getUrlParams } from "../../utils/utils";

const selectMenuOptions = [
  { label: "الكل" },
  { label: "متاح" },
  { label: "غير متاح" },
  { label: "مشغول" },
];

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
    key: "language",
    label: "اللغة",
    isFilterable: true,
  },
  {
    key: "nationality",
    label: "الجنسية",
    isFilterable: true,
  },
  {
    key: "phone_number",
    label: "رقم الجوال",
    isFilterable: true,
  },
  {
    key: "vehicle_number",
    label: "رقم الشاحنة",
    isFilterable: true,
  },
  {
    key: "status",
    label: "الحالة",
    isFilterable: true,
  },
];

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-[#B3E5BD]";
    case "busy":
      return "bg-[#CCCCCC]";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "text-[#2E853F]";
    case "busy":
      return "text-[#333333]";
  }
};

const getLang = (lang: string) => {
  switch (lang) {
    case "ar":
      return "العربية";
    case "en":
      return "الانجليزية";
    case "ur":
      return "أردو";
    default:
      return lang;
  }
};
const Drivers = () => {
  const navigate = useNavigate();
  const [selectedDriverStatus, setSelectedDriverStatus] = useState("الكل");
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView } = useInView();

  const {
    data: driversData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["drivers"],
    queryFn: getDriversList,
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
              navigate("/drivers/add-driver");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            إضافة سائق
            <FiPlus size={24} />
          </button>
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="shadow-xl rounded-3xl px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl text-nowrap font-bold">
              قائمة السائقين
            </h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedDriverStatus}
              setSelectedItem={setSelectedDriverStatus}
            />
          </div>
          <Table
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={driversData?.pages?.length}
          >
            {driversData?.pages &&
              driversData.pages.map((page) =>
                page.data.results.map((driver) => (
                  <TableRow
                    key={driver.id}
                    index={rowIndex++}
                    onClick={() =>
                      navigate("/drivers/driver-details/" + driver.id)
                    }
                  >
                    <TableCell>{driver.id}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{getLang(driver.language)}</TableCell>
                    <TableCell>{driver.nationality}</TableCell>
                    <TableCell>{driver.phone_number}</TableCell>
                    <TableCell>{driver.vehicle_number}</TableCell>
                    <TableCell>
                      <span
                        className={`py-2 text-center font-medium inline-block rounded-md w-44 text-sm ${getStatusColor(
                          driver.status,
                        )} ${getStatusBgColor(driver.status)}`}
                      >
                        {driver.is_active ? "متاح" : "غير متاح"}
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

export default Drivers;
