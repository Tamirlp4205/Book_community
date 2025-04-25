import LeftSideBar from "../components/LeftSideBar";
import ChatBox from "../components/ChatBox";
import {Navbar} from "../components/Navbar"
import AppContextProvider from "./context/appContext";
export default function Home() {
  return (
    <div>
      <AppContextProvider>
      <div className="flex flex-col w-[1440px] bg-sky-800 h-screen m-auto">
        <Navbar />
        <div className="flex w-full h-full">
          <LeftSideBar />
          <ChatBox />
        </div>
      </div>
      </AppContextProvider>
    </div>
  );
}
