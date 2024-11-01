import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AppContextProvider } from "./context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Community Chat",
  description: "Join our vibrant community chat!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-[1440px] m-auto"> 
          <AppContextProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {children}
          </AppContextProvider>
        </div>
      </body>
    </html>
  );
}
