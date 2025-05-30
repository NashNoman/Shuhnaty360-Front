import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { getUserList } from "../../api/users";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { getUrlParams } from "../../utils/utils";

const selectMenuOptions = [
  { label: "الكل", value: "all" },
  { label: "متاح", value: "available" },
  { label: "غير متاح", value: "notAvailable" },
];

const tableColumns = [
  {
    key: "id",
    label: "(ID)",
    isFilterable: false,
  },
  {
    key: "username",
    label: "اسم المستخدم",
    isFilterable: true,
  },
  {
    key: "first_name",
    label: "الاسم الأول",
    isFilterable: true,
  },
  {
    key: "last_name",
    label: "الاسم الأخير",
    isFilterable: true,
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
    isFilterable: true,
  },
  {
    key: "status",
    label: "الحالة",
    isFilterable: true,
  },
];

const getStatusBgColor = (status: any) =>
  status ? "bg-[#B3E5BD]" : "bg-[#CCCCCC]";
const getStatusColor = (status: any) =>
  status ? "text-[#2E853F]" : "text-[#333333]";

const Users = () => {
  const navigate = useNavigate();
  const [selectedUserStatus, setSelectedUserStatus] = useState("الكل");
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView } = useInView();

  const {
    data: usersData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => getUserList({ page: pageParam }),
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
              navigate("/users/add-user");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            إضافة مندوب
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
              قائمة المناديب
            </h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedUserStatus}
              setSelectedItem={setSelectedUserStatus}
            />
          </div>
          <Table
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={usersData?.pages?.length}
          >
            {usersData?.pages &&
              usersData.pages.map((page) =>
                page.data.results.map((user) => (
                  <TableRow
                    key={user.id}
                    index={rowIndex++}
                    onClick={() => navigate("/users/user-details/" + user.id)}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email || "-"}</TableCell>
                    <TableCell>
                      <span
                        className={`py-2 text-center font-medium inline-block rounded-md w-44 text-sm ${getStatusColor(
                          user.is_active,
                        )} ${getStatusBgColor(user.is_active)}`}
                      >
                        {user.is_active ? "متاح" : "غير متاح"}
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

export default Users;
