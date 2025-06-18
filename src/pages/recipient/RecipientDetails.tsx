import { useParams } from "react-router-dom";
import ErrorContainer from "@/components/ErrorContainer";
import { useRecipientQuery } from "../../api/recipients.api";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import ActionsMenu from "../../components/actionsMenu/ActionsMenu";
import { useSidebar } from "../../context/SidebarContext";

const RecipientDetails = () => {
  const { recipientId } = useParams();
  const { isSidebarOpen } = useSidebar();

  const {
    data: recipientData,
    isLoading,
    error,
    refetch,
  } = useRecipientQuery(recipientId as number | undefined);

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات المستلم"
      />
    );
  }

  const recipient = recipientData?.data;

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/recipients/${recipientId}/edit`,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/recipients/${recipientId}/delete`,
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
        <div className="w-full flex justify-between items-start relative">
          <div className="flex flex-col gap-2">
            {[
              { label: "الاسم", value: recipient?.name },
              { label: "العنوان", value: recipient?.address },
              { label: "رقم الهاتف", value: recipient?.phone_number },
              {
                label: "رقم الهاتف الثانوي",
                value: recipient?.second_phone_number || "لا يوجد",
              },
              {
                label: "البريد الإلكتروني",
                value: recipient?.email || "لا يوجد",
              },
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
          {recipient?.city}
        </h1>
        {/* {Array.isArray(recipient?.branches) &&
          recipient?.branches.length > 0 && (
            <hr className="border-0 border-t-2 border-dashed border-[#666] my-10" />
          )}
        {Array.isArray(recipient?.branches) &&
          recipient?.branches.length > 0 &&
          recipient?.branches.map((branch, index) => (
            <div>
              <ClientBranchDetailsSection
                title={branch.name}
                branchNumber={index + 1}
                address={branch.address}
                mapLink={branch.name_address}
                primaryPhone={branch.phone_number}
                secondaryPhone={branch.second_phone_number}
              />
              {index < (recipient?.branches?.length || 0) - 1 && (
                <hr className="border-0 border-t-2 border-dashed border-[#666] my-10" />
              )}
            </div>
          ))} */}
      </div>
    </>
  );
};

export default RecipientDetails;
