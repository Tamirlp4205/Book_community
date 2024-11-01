import { Input } from "@/components/ui/input";
import Image from "next/image";
import Picture from "@/app/assets/image-1.png";
import { Button } from "@/components/ui/button";

export const PasswordChange = () => {
  return (
    <div className="m-full">
      <div className="w-[1440px] mx-auto flex mt-[156px] justify-between">
        <Image
          src={Picture}
          width={720}
          height={730}
          alt="Picture of the author"
        />
        <div className="w-[538px] flex flex-col gap-[100px]">
          <h1 className="font-bold text-[56px]">Нууц үг солих</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p>Шинэ нууц үг</p>
              <Input placeholder="Шинэ нууц үгээ оруулна уу" />
            </div>
            <div className="flex flex-col gap-3">
              <p>Шинэ нууц үгээ давтана уу </p>
              <Input placeholder="Шинэ нууц үгээ давтан оруулна уу" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button className="bg-[#4262FF] w-[255px] rounded-[32px]">
              Баталгаажуулах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
