import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FileTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Picture</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Images</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default FileTable;
