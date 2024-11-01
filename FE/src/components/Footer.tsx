import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col text-white bg-[#050038] w-full h-[400px] m-auto p-6">
      <div className="w-[1440px] m-auto flex flex-col gap-[80px]">
        <nav className="flex justify-between text-black">
          <p>Нүүр</p>
          <p>Холбоо барих</p>
          <p>Компаны тухай</p>
          <p>Нууцлалын бодлого</p>
        </nav>

        <div className="mt-4  border-[1px] bg-white"></div>

        <footer className="mt-4 flex flex-col items-center">
          <div className="flex items-center text-black">
            <p>© 2024 Bookie</p>
          </div>
          <div className="flex space-x-4 mt-2 text-black">
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
