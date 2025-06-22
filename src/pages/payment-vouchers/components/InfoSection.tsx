import React from "react";

interface InfoSectionProps {
  title: string;
  data: { label: string; value: string | number }[];
  gridCols?: number;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  data,
  gridCols = 2,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-[#DD7E1F] pb-2">
        {title}
      </h2>
      <div className={`grid grid-cols-1 md:grid-cols-${gridCols} gap-6`}>
        {data.map((item, index) => (
          <div key={index}>
            <strong className="text-gray-600">{item.label}:</strong>{" "}
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
