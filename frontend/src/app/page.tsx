"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/apis/loginApi";
import { FormDetailTypes } from "@/helpers/interface";
import { useRouter } from "next/navigation";
export default function Home() {
  const [form, setForm] = useState<Boolean>(false);
  const [register, setRegister] = useState<Boolean>(false);
  const [formDetails, setFormDetails] = useState<FormDetailTypes>({
    email: "",
    password: "",
  });
  const formMethod = (condition: Boolean, reg: Boolean): void => {
    setForm(condition);
    setRegister(reg);
  };
  const router = useRouter();
  const { mutate: login } = useMutation({
    // Using React Query approach
    mutationFn: async () => {
      const response = await loginUser(formDetails, register);
      return response;
    },
    onError: (error: any | null, variables, context) => {
      console.log(error);
      alert(error?.response?.data?.msg);
      // alert("Please login again, token expired!")
      router.push("/");
    },
    onSuccess: (data: any, variables, context) => {
      console.log(data);
      router.push("/files");
    },
  });
  return (
    <>
      {!form ? (
        <div className="flex gap-5 flex-row ">
          <Button onClick={() => formMethod(true, true)}>Register</Button>
          <Button onClick={() => formMethod(true, false)}>Login</Button>
        </div>
      ) : (
        <div>
          {form && (
            !register ? <Button variant="outline" className="mb-[10px]" onClick={() => formMethod(true, true)}>Register</Button> :
            <Button variant="outline" className="mb-[10px]" onClick={() => formMethod(true, false)}>Login</Button>
          )}
          <div className=" shadow-sm border-[#E4E4E7] border-solid border-[1px] rounded-lg min-w-[407px]">
            <div className="p-[32px_24px_32px_24px]">
              <h3 className=" text-[#09090B] text-[24px] font-semibold tracking-[-2.5%] leading-[32px] pb-[20px]">
                {register ? <span>Create Account</span> : <span>Login</span>}
              </h3>
              <h5 className="text-[#09090B] text-[14px] leading-[14px] font-medium pb-[10px]">
                Email
              </h5>
              <Input
                type="email"
                placeholder="m@example.com"
                className="mb-[20px]"
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    email: e.target.value,
                  })
                }
              />
              <h5 className="text-[#09090B] text-[14px] leading-[14px] font-medium pb-[10px]">
                Password
              </h5>
              <Input
                type="email"
                className="mb-[20px]"
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    password: e.target.value,
                  })
                }
              />
              <Button className="w-full" onClick={() => login()}>
                {register ? <span>Create Account</span> : <span>Login</span>}
              </Button>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}
