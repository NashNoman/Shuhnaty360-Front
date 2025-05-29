import React from "react";
import { cn } from "../../../utils/utils";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableLoader from "./TableLoader";
import TableNoDataRow from "./TableNoDataRow";

type TableColumn = {
  key: string;
  label: string;
  isFilterable?: boolean;
};

type TableProps = {
  children: React.ReactNode;
  columns: TableColumn[];
  dataCount?: number;
  isLoading: boolean;
  className?: string;
};

const Table = ({
  columns,
  children,
  dataCount,
  isLoading,
  className,
}: TableProps) => {
  return (
    <div className={`w-full overflow-x-auto min-h-[40vh]`}>
      <table className={cn(`bg-[#FCFCFC] w-full`, className)}>
        <TableHead columns={columns} />
        <TableBody>
          {children}
          {isLoading && <TableLoader span={columns.length} />}
          {!isLoading && !dataCount && <TableNoDataRow span={columns.length} />}
        </TableBody>
      </table>
    </div>
  );
};

export default Table;
