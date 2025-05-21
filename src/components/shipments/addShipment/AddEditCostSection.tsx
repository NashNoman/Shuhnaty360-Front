import AddEditInfoSection from "./AddEditInfoSection";
import AddShipmentInput from "./addShipmentInputs/AddShipmentInput";

const AddEditCostSection = ({
  inputs,
  section,
  value,
  onChange,
  setNights,
  setCostPerNight,
  totalCost,
  page,
}: any) => {
  const isMobileScreen = window.innerWidth < 640;
  const handleNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNights(value);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setCostPerNight(value);
  };

  return (
    <>
      <div>
        <AddEditInfoSection
          title="التكلفة ر.س"
          inputs={inputs}
          section={section}
          value={value}
          onChange={onChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 flex flex-col gap-1 font-Rubik">
            <label className="text-[#1A1A1A]">المبيت</label>
            <div className="flex border border-[#CCCCCC] rounded-lg overflow-hidden py-1">
              <input
                type="text"
                placeholder={
                  page === "addShipment"
                    ? isMobileScreen
                      ? "عدد"
                      : " عدد الليالي"
                    : ""
                }
                value={
                  page === "editShipment"
                    ? `${value.numberOfNights} لليلة`
                    : undefined
                }
                onChange={handleNightsChange}
                className="w-2/6 lg:w-1/6 p-2 text-center border-l border-[#666666] focus:outline-none no-arrows"
              />
              <input
                type={page === "editShipment" ? "text" : "number"}
                placeholder={
                  page === "addShipment"
                    ? isMobileScreen
                      ? "تكلفة المبيت لليلة"
                      : "تكلفة المبيت لليلة الواحدة"
                    : ""
                }
                value={
                  page === "editShipment"
                    ? `${value.costPerNight} لليلة الواحدة`
                    : undefined
                }
                onChange={handleCostChange}
                className="w-4/6 lg:w-5/6 py-2 ps-2 md:ps-4 lg:ps-10 text-start focus:outline-none no-arrows"
              />
            </div>
            {page === "editShipment" ? (
              <div className="text-[#DD7E1F] mt-1">
                تكلفة المبيت:{" "}
                {(value.numberOfNights * value.costPerNight).toLocaleString()}{" "}
                ر.س
              </div>
            ) : value.numberOfNights * value.costPerNight > 0 ? (
              <div className="text-[#DD7E1F] mt-1">
                تكلفة المبيت:{" "}
                {(value.numberOfNights * value.costPerNight).toLocaleString()}{" "}
                ر.س
              </div>
            ) : (
              <span className="text-[#999999] text-sm mt-1">
                تظهر هنا تكلفة المبيت
              </span>
            )}
          </div>
          <div className="col-span-1">
            <AddShipmentInput
              label="الخصم"
              type="number"
              name="discount"
              value={value.discount}
              onChange={onChange}
            />
          </div>
          <div className="col-span-1">
            <AddShipmentInput
              label="الأجرة المرتجعة"
              type="number"
              name="returnFare"
              value={value.returnFare}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      {page === "editShipment" && (
        <div className="w-full mt-12 flex flex-col items-center gap-4 text-[#DD7E1F] font-Rubik text-lg">
          <span>التكلفة الإجمالية</span>
          <span className="font-bold">{totalCost.toLocaleString()} ر.س</span>
        </div>
      )}
    </>
  );
};

export default AddEditCostSection;
