import Image from "next/image";
import Link from "next/link";
import Picture1 from "@/assets/HomePic.png";
import Picture2 from "@/assets/book.png";
import Footer from "./Footer";
import Picture3 from "@/assets/istockphoto-1364968259-170667a.jpg";
import Picture4 from "@/assets/BookSwap.webp";
import Picture5 from "@/assets/bookolow.webp";

export const HomePage = () => {
  return (
    <div className="flex m-auto w-full flex-col gap-10 bg-slate-200">
      {/* Hero Section */}
      <div className="flex flex-col items-center w-full gap-10 m-auto">
        <div className="flex h-[800px] justify-between items-center gap-20">
          <div className="flex flex-col items-start m-auto p-4">
            <h1 className="text-6xl font-bold">Номтой нөхөрлөгчид</h1>
            <p className="mt-12 mb-12 text-lg">
              Bookie бол таныг бусад найзуудтай чинь холбоно
            </p>
            <Link
              href="/signup"
              className="flex justify-center bg-blue-500 rounded-full p-2 text-white w-[300px] hover:bg-[#365bbf] transition"
            >
              Энд дарж бүртгүүлнэ үү
            </Link>
          </div>
          <div>
            <Image
              src={Picture1}
              width={720}
              height={730}
              alt="Picture of the author"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Book Section */}
      <div className="flex flex-col h-[400px] bg-white w-full">
        <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto p-4 border-b">
          <p className="text-lg font-semibold">Долоо хоногийн онцлох</p>
          <p className="text-blue-600 cursor-pointer hover:underline">
            Цааш үзэх --
          </p>
        </div>
        <div className="flex justify-center items-center h-full gap-10">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[300px] text-center">
            BOOKCARD
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[300px] text-center">
            BOOKCARD
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[300px] text-center">
            BOOKCARD
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[300px] text-center">
            BOOKCARD
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-col items-center w-full max-w-[1440px] h-[400px] m-auto p-4">
        <div className="text-xl font-bold mb-4">Bookie-д нэгдсэнээр</div>
        <div className="w-full max-w-[1260px] flex justify-between mt-20">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-lg font-semibold">Ном солилцон унших</h1>
            <Image
              src={Picture3}
              width={300}
              height={400}
              alt="Picture of the author"
              className="rounded-lg shadow-lg h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-lg font-semibold">Номын нөхөдтэй болох</h1>
            <Image
              src={Picture4}
              width={300}
              height={200}
              alt="Picture of the author"
              className="rounded-lg shadow-lg h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-lg font-semibold">Өөрийн сонирхолын номоо олно</h1>
            <Image
              src={Picture5}
              width={300}
              height={200}
              alt="Picture of the author"
              className="rounded-lg shadow-lg h-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex items-center w-[1440px] gap-10 bg-slate-200 m-auto">
        <Image
          src={Picture2}
          width={720}
          height={730}
          alt="Picture of the author"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="flex h-[800px] justify-between items-center gap-20">
        <div className="flex flex-col items-start m-auto p-4">
          <h1 className="text-6xl font-bold">Номын нөхөдтэй чатлах уу ???</h1>
          <p className="mt-12 mb-12 text-lg">
            Бидний нэг болсоноор та номын нөхөдтэйгөө санаагаа хуваалцан
            ярилцаж нөхөрлөх боломжтой.
          </p>
          <p className="text-blue-600 cursor-pointer hover:underline">
            Цааш үзэх --
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};
