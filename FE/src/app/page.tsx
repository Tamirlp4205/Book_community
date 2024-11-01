import { HomePage } from "../components/HomePage";
import {Navbar} from "../components/Navbar"
import AppContextProvider from "./context/appContext";
export default function Home() {
  return (
    <div>
      <AppContextProvider>
      <Navbar/>
      <HomePage />
      </AppContextProvider>
    </div>
  );
}
