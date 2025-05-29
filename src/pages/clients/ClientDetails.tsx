import { useParams } from "react-router-dom";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import ActionsMenu from "../../components/actionsMenu/ActionsMenu";
import ClientBranchDetailsSection from "../../components/clients/ClientBranchDetailsSection";
import { useSidebar } from "../../context/SidebarContext";
import { useFetch } from "../../hooks/useApi";
import { ApiResponse, Client } from "../../types";

const ClientDetails = () => {
  const { clientId } = useParams();
  const { isSidebarOpen } = useSidebar();

  const { data: clientRes, isLoading } = useFetch<ApiResponse<Client>>(
    ["clients", clientId],
    `/clients/${clientId}`,
    undefined,
    !!clientId,
  );

  const client = clientRes?.data;

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/clients/edit-client/${clientId}`,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/clients/delete-client/${clientId}`,
    },
  ];

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

      <div className="border border-[#DD7E1F] rounded-lg px-6 pt-10 pb-4 mx-4 md:mx-0">
        <div className="w-full flex justify-between items-start sm:items-center relative">
          <div className="flex flex-col gap-2">
            {[
              { label: "الاسم", value: client?.name },
              { label: "العنوان", value: client?.address },
            ].map((item, index) => (
              <div
                className="flex flex-col sm:flex-row gap-2 font-medium text-base font-Rubik"
                key={index}
              >
                <span>{item.label}: </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <ActionsMenu
            options={menuActions}
            position={`top-7 -left-4 sm:top-11`}
          />{" "}
        </div>
        <h1 className="mt-10 bg-[#FCF2E9] font-md font-Rubik text-lg text-[#1A1A1A] p-3 rounded-md">
          {client?.dicription}
        </h1>
        {Array.isArray(client?.branches) && client?.branches.length > 0 && (
          <hr className="border-0 border-t-2 border-dashed border-[#666] my-10" />
        )}
        {Array.isArray(client?.branches) &&
          client?.branches.length > 0 &&
          client?.branches.map((branch, index) => (
            <div>
              <ClientBranchDetailsSection
                title={branch.name}
                branchNumber={index + 1}
                address={branch.address}
                mapLink={branch.name_address}
                primaryPhone={branch.phone_number}
                secondaryPhone={branch.second_phone_number}
              />
              {index < client?.branches.length - 1 && (
                <hr className="border-0 border-t-2 border-dashed border-[#666] my-10" />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ClientDetails;
