import PhoneNumberInput from "./addShipmentInputs/phoneNumberInput/PhoneNumberInput";
import AddEditInfoSection from "./AddEditInfoSection";
import { useEffect, useState } from "react";

const AddEditFullInfoSection = ({
  title,
  inputs,
  value,
  onChange,
  section,
  options,
  branchOptions,
  initiallySelectedClientBranchId,
  selectedMenuItem,
  page,
  doesHaveBreakLine = true,
}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNotesAreaVisible, setIsNotesAreaVisible] = useState(false);

  const handleItemChange = (selected: any) => {
    if (!selected) {
      setSelectedItem(null);
      return;
    }

    const updates = {
      selectedItem: selected,
      formUpdates: {
        [`${section}Id`]: selected.id,
        [`${section}Address`]: selected.address || "",
        [`${section}PrimaryPhoneNumber`]: selected.phone_number || "",
        [`${section}SecondaryPhoneNumber`]: selected.second_phone_number || "",
        [`${section}FacilityDescription`]:
          selected.dicription || selected.description || "",
      },
    };

    setSelectedItem(updates.selectedItem);
    onChange({
      target: {
        name: section,
        value: updates.formUpdates,
      },
    });
  };

  useEffect(() => {
    setSelectedItem(selectedMenuItem);
  }, [selectedMenuItem]);

  return (
    <div className="mb-10">
      <AddEditInfoSection
        title={title}
        inputs={inputs}
        handleClientRecipientChange={handleItemChange}
        clientRecipientSelectMenuValue={selectedItem}
        value={value}
        onChange={onChange}
        options={options}
        section={section}
        branchOptions={branchOptions}
        initiallySelectedClientBranchId={initiallySelectedClientBranchId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {["PrimaryPhoneNumber", "SecondaryPhoneNumber"].map((type, index) => (
          <PhoneNumberInput
            key={index}
            label={`رقم الهاتف (${type === "PrimaryPhoneNumber" ? "أساسي" : "احتياطي"})`}
            value={
              page !== "client"
                ? selectedItem?.[
                    type === "PrimaryPhoneNumber"
                      ? "phone_number"
                      : "second_phone_number"
                  ] || ""
                : value[`${type}`]
            }
            onChange={(val: any) =>
              onChange(
                page !== "client"
                  ? {
                      target: {
                        name: `${section}${type}`,
                        value: val,
                      },
                    }
                  : {
                      target: {
                        name: type,
                        value: val,
                      },
                    },
              )
            }
          />
        ))}
      </div>
      {isNotesAreaVisible ? (
        <div className="w-full flex flex-col items-start gap-1 my-12">
          <span>ملاحظات</span>
          <textarea
            name={`${page !== "client" ? `${section}FacilityDescription` : "description"}`}
            value={
              page !== "client"
                ? value[`${section}FacilityDescription`] || ""
                : value["description"]
            }
            onChange={onChange}
            placeholder="أضف ملاحظة"
            className="w-full h-56 mb-2 p-4 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F] resize-none font-Rubik"
          ></textarea>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={() => setIsNotesAreaVisible(false)}
              className="col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] p-2 rounded-lg"
            >
              إخفاء
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsNotesAreaVisible(true)}
          className="col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] p-2 rounded-lg my-6"
        >
          إضافة ملاحظات
        </button>
      )}
      {doesHaveBreakLine && (
        <hr className="border-0 border-t-2 border-dashed border-[#666]" />
      )}
    </div>
  );
};

export default AddEditFullInfoSection;
