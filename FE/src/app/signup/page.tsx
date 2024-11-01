"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Picture from "@/assets/image-1.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signUp } from "@/config/auth";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [name,setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(name ,email, password);
        router.push("/profile"); 
    } catch (err) {
      const error = err as AuthError;
      setError(error.message); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[1440px] mx-auto flex mt-[20px] justify-between">
        <Image
          src={Picture}
          width={720}
          height={730}
          alt="Signup Image"
        />
        <div className="w-[538px] flex flex-col gap-[40px]">
          <h1 className="font-bold text-[56px]">Тавтай морил</h1>
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col gap-3">
              <p>Нэр</p>
              <Input
                type="name"
                placeholder="И-мэйл ээ оруулна уу"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>И-мэйл</p>
              <Input
                type="email"
                placeholder="И-мэйл ээ оруулна уу"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Нууц үг</p>
              <Input
                type="password"
                placeholder="Нууц үгээ оруулна уу"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Нууц үг давтах</p>
              <Input
                type="password"
                placeholder="Нууц үгээ давтаж оруулна уу"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className="bg-[#4262FF] w-[255px] rounded-[32px]"
              >
                Бүртгүүлэх
              </Button>
            </div>
          </form>
          <div className="w-full flex justify-center">
            <p className="flex gap-3">
              Бүртгэлтэй юу?
              <Link href="/login" className="text-[#0F3DDE]">
                Нэвтрэх
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
