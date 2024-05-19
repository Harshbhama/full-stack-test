import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDataTypes } from "@/helpers/interface";
const BackendUrl = process.env.BACKEND_URL || "http://localhost:4000"
const FileTable: React.FC<UserDataTypes> = ({ tableData }) => {
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
        {tableData?.map((data, index: number) => {
          return (
            <TableRow key={data?.id}>
              <TableCell className="font-medium">
                <img
                  src={`data:image/png;base64, ${data?.base64String}`}
                  alt="image"
                  className="w-[30px] h-[30px]"
                />
              </TableCell>
              <TableCell>{data?.status}</TableCell>
              <TableCell className=" cursor-pointer"><a href={`${BackendUrl}/download/${data?.path}.png`}>View</a></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default FileTable;