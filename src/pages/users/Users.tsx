/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import UsersTable from "../../components/usersDrivers/UsersTable";
import { useSidebar } from "../../context/SidebarContext";
import { GetUsersResponse } from "../../types";
import api from "../../utils/axios";

const selectMenuOptions = [
  { label: "الكل", value: "all" },
  { label: "متاح", value: "available" },
  { label: "غير متاح", value: "notAvailable" },
];

const Users = () => {
  const navigate = useNavigate();
  const [selectedUserStatus, setSelectedUserStatus] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const { isSidebarOpen } = useSidebar();

  const { data: res, isLoading } = useQuery<GetUsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/accounts/users");

      console.log(res.data);

      return res.data;
    },
  });

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const fieldsToCheck = ["username", "first_name", "last_name", "email"];

  console.log(res?.data);
  const filteredData = res?.data?.results;
  console.log("Filtered Data:", filteredData);

  // .filter((user: any) => {
  //   const matchesSearch = fieldsToCheck.some((field) => {
  //     const fieldValue = user[field];
  //     return (
  //       typeof fieldValue === "string" &&
  //       fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
  //     );
  //   });
  //   const matchesStatus =
  //     selectedUserStatus === "الكل" ||
  //     (selectedUserStatus === "متاح" && user.status === "available") ||
  //     (selectedUserStatus === "غير متاح" && user.status === "notAvailable");
  //   return matchesSearch && matchesStatus;
  // });

  // const sortedData = [...filteredData].sort((a: any, b: any) => a.id - b.id);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
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
          {filteredData && (
            <UsersTable
              selectedStatus={selectedUserStatus}
              data={filteredData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              page="users"
            />
          )}
          <Pagination
            totalItems={res?.data?.count || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
