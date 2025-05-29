import { TiFilter } from "react-icons/ti";

type TableColumn = {
  key: string;
  label: string;
  isFilterable?: boolean;
};

type TableHeadProps = {
  columns: TableColumn[];
};

const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <thead>
      <tr className="py-2 px-4 text-right text-nowrap border-b-2 border-[#CCCCCC]">
        {columns.map((col, index) => {
          return (
            <th key={col.key} className="px-4 py-2 text-left font-medium">
              <div
                className={`font-bold flex items-center gap-1 ${index === columns.length - 1 && "ms-16"}`}
              >
                {col.label}
                {col.isFilterable && (
                  <button
                    type="button"
                    onClick={() => {
                      // Handle filter toggle logic here
                    }}
                  >
                    <TiFilter
                      size={22}
                      className="text-gray-400 hover:text-gray-900"
                    />
                  </button>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
