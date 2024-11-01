"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../assets/Logo";
import { auth } from "@/config/firebase";
import { logOut } from "@/config/auth";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "@/app/context/appContext";
import { AvatarIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("AppContext must be used within an AppContextProvider");
  }

  const { loadUserData } = appContext;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadUserData(user.uid);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [router, loadUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    logOut();
    router.push("/");
  };

  return (
    <div className="bg-white w-full p-4 border-b-2">
      <div className="flex m-auto max-w-[1440px] justify-between items-center gap-20 max-h-[74px]">
        <div className="flex gap-8 items-center">
          <Logo />
          <div className="flex gap-10">
            <Link href="/">Нүүр</Link>
            <Link href="/library">Номын сан</Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <div className="flex gap-10">
              <Link href="/profile">
                <AvatarIcon className="w-8 h-8" />
              </Link>
              <Link href="/chat">
                <MessageCircle className="w-8 h-8" />
              </Link>
              <div
                onClick={handleLogout}
                className="cursor-pointer bg-blue-500 text-white p-2 rounded-full w-20 flex justify-center"
              >
                Гарах
              </div>
            </div>
          ) : (
            <>
              <Link href="/login">
                <div className="cursor-pointer">Нэвтрэх</div>
              </Link>
              <Link href="/signup">
                <div className="bg-blue-500 rounded-lg p-2 text-white">
                  Бүртгүүлэх
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
