import ChatBox from "@/components/ChatBox";
import LeftSideBar from "@/components/LeftSideBar";
import { Navbar } from "@/components/Navbar";
import AppContextProvider from "../context/appContext";
import "react-toastify/dist/ReactToastify.css";

const Chat = () => {
  return (
    <AppContextProvider>
      <div className="flex flex-col w-[1440px] bg-sky-800 h-screen m-auto">
        <Navbar />
        <div className="flex w-full h-full">
          <LeftSideBar />
          <ChatBox />
        </div>
      </div>
    </AppContextProvider>
  );
};

export default Chat;
