import { FiLoader } from "react-icons/fi";
import TableCell from "./TableCell";
import TableRow from "./TableRow";

type TableNoDataRowProps = {
  span?: number;
};

const TableLoader = ({ span = 1 }: TableNoDataRowProps) => {
  return (
    <TableRow index={1}>
      <TableCell colSpan={span} className="text-center py-8">
        <FiLoader className="animate-spin size-10 mx-auto" />
      </TableCell>
    </TableRow>
  );
};

export default TableLoader;
