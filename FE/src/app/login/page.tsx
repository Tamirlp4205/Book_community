"use client";

import { useState, FormEvent } from "react";
import { AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/config/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await login(email, password);
      router.push("/chat");
    } catch (err) {
      const firebaseError = err as AuthError;
      const formattedErrorMessage = firebaseError.message
        .replace("Firebase:", "")
        .replace(/auth\/|-/g, " ")
        .trim();

      setError(formattedErrorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[1440px] mx-auto flex mt-[156px] justify-center">
        <div className="w-[538px] flex flex-col gap-[100px]">
          <h1 className="font-bold text-[56px]">Тавтай морил</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && <p className="text-red-500">{error}</p>}
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
              <div className="flex w-full justify-between">
                <p>Нууц үг</p>
                <Link href="/forgot-password" className="text-[#0F3DDE]">
                  Нууц үгээ мартсан
                </Link>
              </div>
              <Input
                type="password"
                placeholder="Нууц үгээ оруулна уу"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <Button type="submit" className="bg-[#4262FF] w-[255px] rounded-[32px]">
                Нэвтрэх
              </Button>
            </div>
          </form>
          <div className="w-full flex justify-center">
            <p className="flex gap-3">
              Бүртгэлтэй юу?
              <Link href="/signup" className="text-[#0F3DDE]">
                Бүртгүүлэх
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
