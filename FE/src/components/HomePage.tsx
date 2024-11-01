"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Picture1 from "@/assets/HomePic.png";
import Picture2 from "@/assets/book.png";
import Footer from "./Footer";
import Picture3 from "@/assets/istockphoto-1364968259-170667a.jpg";
import Picture4 from "@/assets/BookSwap.webp";
import Picture5 from "@/assets/bookolow.webp";
import Picture6 from "../assets/image (5).png";
import Picture7 from "@/assets/image (6).png";
import Picture8 from "@/assets/image (7).png";
import Picture9 from "@/assets/image (8).png";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const heroItems = [
  {
    title: "Номтой нөхөрлөгчид",
    description: "Bookie бол таныг бусад найзуудтай чинь холбоно",
    image: Picture1,
  },
  {
    title: "Номын нөхөдтэй чатлах уу ?",
    description: "Бидний нэг болмсоноор та номын нөхөдтэйгөө санаагаа хуваалцан ярилцаж нөхөрлөх боломжтой.",
    image: Picture2,
  },
  {
    title: "Та өөрийн хүссэн номоо олж унших",
    description: "Бидний нэг болмсоноор та номын нөхөдтэйгөө санаагаа хуваалцан ярилцаж нөхөрлөх боломжтой.",
    image: Picture2,
  },
  {
    title: "Өөртэйгөө ижил сонирхолтой хүн олох",
    description: "Бидний нэг болмсоноор та номын нөхөдтэйгөө санаагаа хуваалцан ярилцаж нөхөрлөх боломжтой.",
    image: Picture2,
  },
  {
    title: "Номын нөхөдтэй чатлах уу???",
    description: "Бидний нэг болмсоноор та номын нөхөдтэйгөө санаагаа хуваалцан ярилцаж нөхөрлөх боломжтой.",
    image: Picture2,
  },
];

export const HomePage = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const nextHero = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex - 1 + heroItems.length) % heroItems.length);
  };

  return (
    <div className="flex flex-col items-center w-full gap-10 m-auto">
      {/* Hero Carousel Section */}
      <div className="flex h-[800px] justify-between items-center gap-20 relative">
        <div className="flex flex-col items-start ml-20 p-4">
          <h1 className="text-6xl font-bold">{heroItems[currentHeroIndex].title}</h1>
          <p className="mt-12 mb-12 text-lg">{heroItems[currentHeroIndex].description}</p>
          <Link
            href="/signup"
            className="flex justify-center bg-blue-500 rounded-full p-2 text-white w-[300px] hover:bg-[#365bbf] transition"
          >
            Энд дарж бүртгүүлнэ үү
          </Link>
        </div>
        <div className="mr-20 relative rounded-lg shadow-lg w-[500px] h-[400px] ">
          <Image
            src={heroItems[currentHeroIndex].image}
            width={500}
            height={400}
            alt="Hero image"
          />
        </div>
        <div className="absolute  left-0 right-0 flex justify-between ">
          <button onClick={prevHero} className="p-2 rounded hover:bg-gray-400"><ArrowBigLeft/></button>
          <button onClick={nextHero} className="p-2 rounded hover:bg-gray-400"><ArrowBigRight/></button>
        </div>
      </div>

      <div className="flex flex-col h-[400px] bg-white w-full">
        <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto p-4 border-b">
          <p className="text-lg font-semibold">Долоо хоногийн онцлох</p>
          <p className="text-blue-600 cursor-pointer hover:underline">Цааш үзэх </p>
        </div>
        <div className="flex justify-center items-center h-full gap-10 mt-20">
          {[
            { title: "Хөх тэнгэр сонсож бай", image: Picture6 },
            { title: "Dune", image: Picture7 },
            { title: "Цагаан бороо", image: Picture8 },
            { title: "Анна", image: Picture9 },
          ].map((book) => (
            <div key={book.title} className="bg-g p-4 rounded-lg shadow-md w-[300px] text-center">
              <div className="flex flex-col items-center gap-8">
                <h1 className="text-lg font-semibold">{book.title}</h1>
                <Image
                  src={book.image}
                  width={300}
                  height={400}
                  alt={book.title}
                  className="rounded-lg shadow-lg h-[300px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center w-full max-w-[1440px] h-[400px] m-auto p-4">
        <div className="w-full max-w-[1260px] flex flex-col justify-center items-center mt-20">
          <div className="text-xl font-bold mt-10">Bookie-д нэгдсэнээр</div>
          <div className="flex max-w-[1260px] gap-20 justify-between mt-16">
            {[
              { title: "Ном солилцон унших", image: Picture3 },
              { title: "Номын нөхөдтэй болох", image: Picture4 },
              { title: "Өөрийн сонирхолын номоо олно", image: Picture5 },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center gap-8">
                <h1 className="text-lg font-semibold">{feature.title}</h1>
                <Image
                  src={feature.image}
                  width={300}
                  height={200}
                  alt={feature.title}
                  className="rounded-lg shadow-lg h-[300px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex h-[800px] justify-between items-center gap-20 mt-20">
        <Image
          src={Picture2}
          width={720}
          height={730}
          alt="Chat with friends"
          className="rounded-lg shadow-lg"
        />
        <div className="flex flex-col items-start m-auto p-4">
          <h1 className="text-6xl font-bold">Номын нөхөдтэй чатлах уу ???</h1>
          <p className="mt-12 mb-12 text-lg">
            Бидний нэг болсоноор та номын нөхөдтэйгөө санаагаа хуваалцан ярилцаж нөхөрлөх боломжтой.
          </p>
          <p className="text-blue-600 cursor-pointer hover:underline">Цааш үзэх </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};
