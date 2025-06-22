import React from "react";

interface VoucherInfoRowProps {
  label: string;
  value: string | number | undefined;
}

const VoucherInfoRow: React.FC<VoucherInfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center py-1 border-b border-dashed">
      <span className="font-bold">{label}:</span>
      <span>{value || "-"}</span>
    </div>
  );
};

export default VoucherInfoRow;
