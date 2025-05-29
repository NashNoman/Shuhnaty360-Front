import TableCell from "./TableCell";
import TableRow from "./TableRow";

type TableNoDataRowProps = {
  span?: number;
};

const TableNoDataRow = ({ span = 1 }: TableNoDataRowProps) => {
  return (
    <TableRow index={0}>
      <TableCell colSpan={span} className="text-center">
        لا توجد بيانات لعرضها
      </TableCell>
    </TableRow>
  );
};

export default TableNoDataRow;
