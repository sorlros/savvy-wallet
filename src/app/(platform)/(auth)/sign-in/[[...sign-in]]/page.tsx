"use client";

import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import Heading from "@/components/heading";
import Input from "@/components/input/input";
import Button from "@/components/button";
import axios from "axios";
import prisma from "@/libs/prismadb";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    setIsLoading(true);

    axios
      .post("/api/register", data, { method: "POST" })
      .then(() => {
        toast.success("계정이 생성되었습니다.");
      })
      .catch((error) => {
        toast.error("계정 생성에 실패했습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    // signIn("credentials", {
    //   ...data,
    //   redirect: false,
    // }).then((callback) => {
    //   setIsLoading(false);

    //   if (callback?.ok) {
    //     toast.success("로그인 완료");
    //     router.refresh();
    //     loginModal.onClose();
    //   }

    //   if (callback?.error) {
    //     toast.error(callback.error);
    //   }
    // });
  };

  // const toggle = useCallback(() => {
  //   loginModal.onClose();
  //   registerModal.onOpen();
  // }, [loginModal, registerModal]);

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome" subtitle="계정을 로그인해주세요" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Button label="Login" onClick={handleSubmit(onSubmit)} />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>이미 계정이 있으신가요?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={() => {}}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
