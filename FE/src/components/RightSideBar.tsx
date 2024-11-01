"use client";
import { useContext } from "react";
import { AppContext } from "@/app/context/appContext";
import Image from "next/image";

const RightSideBar = () => {
    const { userData } = useContext(AppContext); 


    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp?.seconds * 1000 || Date.now());
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      };
    return (
        <div className="w-[600px] p-4 border-l">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            {userData ? (
                <div className="flex items-center">
                    <Image
                        src={userData.avatar || "/default-avatar.png"} 
                        alt={`${userData.username}'s avatar`}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{userData.username}</h3>
                        <p>Email: {userData.email}</p>
                        <p>Joined: {formatTimestamp(userData.createdAt)}</p>
                    </div>
                </div>
            ) : (
                <p>No user data available</p> 
            )}
        </div>
    );
};

export default RightSideBar;
