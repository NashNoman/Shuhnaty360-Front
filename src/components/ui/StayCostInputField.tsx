import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ShipmentSerializerSchema } from "../../schemas/shipment.schema";
import { cn } from "../../utils/utils";

export type StayCostInputFieldProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
};

const StayCostInputField = ({ register, errors }: StayCostInputFieldProps) => {
  const [daysStayed, setDaysStayed] = useState<number>(0);
  const [stayCost, setStayCost] = useState<number>(0);

  const daysStayedRegister = register("days_stayed");
  const stayCostRegister = register("stay_cost");

  const total = daysStayed * stayCost;

  return (
    <div className="col-span-1 flex flex-col gap-1">
      <label className="self-start text-xl mb-2 text-[#1A1A1A]">المبيت</label>
      <div
        className={cn(
          "flex overflow-hidden gap-2 bg-white text-lg border border-[#CCCCCC] rounded-lg focus-within:ring-1 focus-within:ring-[#DD7E1F]",
          (errors.stay_cost?.message || errors.days_stayed?.message) &&
            "border-red-500",
        )}
      >
        <input
          placeholder="عدد الليالي"
          type="number"
          className="w-1/5 p-2 focus:outline-hidden "
          autoComplete="off"
          {...daysStayedRegister}
          onChange={(e) => {
            setDaysStayed(parseInt(e.target.value));
            daysStayedRegister.onChange(e);
          }}
        />
        <div
          className={cn(
            "h-full w-0.5 bg-[#CCCCCC]",
            (errors.stay_cost?.message || errors.days_stayed?.message) &&
              "bg-red-500",
          )}
        />
        <input
          placeholder="تكلفة المبيت لليلة الواحدة"
          type="number"
          className="grow px-2 focus:outline-hidden "
          autoComplete="off"
          {...stayCostRegister}
          onChange={(e) => {
            setStayCost(parseInt(e.target.value));
            stayCostRegister.onChange(e);
          }}
        />
      </div>
      {errors.days_stayed?.message && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.days_stayed?.message}
        </span>
      )}
      {errors.stay_cost?.message && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.stay_cost?.message}
        </span>
      )}
      <div className="text-[#999] font-Rubik text-sm">
        <span>{total ? `${total} ر.س` : "تظهر هنا تكلفة المبيت"}</span>
      </div>
    </div>
  );
};

export default StayCostInputField;
