"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchFiles } from "@/apis/uploadApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FileTable from "@/components/FileTable";

const Page = () => {
  const router = useRouter();
  // @ts-ignore
  const { data, status, isError } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      return await fetchFiles();
    },
    refetchInterval: 3000
  });
  if (isError) {
    router.push("/");
    alert("Invalid token, please login again");
    alert("Please login again, token expired!")
    router.push('/')
  }
  let tableData = data?.data?.data
  console.log("data", data);
  console.log("isError", isError);
  console.log("tableData",tableData)
  return (
    <>
      <div className=" shadow-sm border-[#E4E4E7] border-solid border-[1px] rounded-lg md:min-w-[920px] flex items-center justify-center">
        <div className="p-[10px_40px_20px_40px] flex justify-center flex-col items-center">
          <Button className="mt-[10px] mb-[15px]" variant="outline" onClick={() => router.push('/upload')}>
            Upload
          </Button>
          <div className="shadow-sm border-[#E4E4E7] border-solid border-[1px] rounded-lg flex items-center justify-center md:min-w-[600px] mb-[15px]">
            {!!tableData?.length && <FileTable tableData={tableData}/>}
          </div>
          <div className="flex flex-row gap-4">
            <Button className=" mb-[15px] text-[#18181B]" variant="outline">
              Previous
            </Button>
            <Button className=" mb-[15px] text-[#18181B]" variant="outline">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
