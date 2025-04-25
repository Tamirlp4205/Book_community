/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useContext, useState, ChangeEvent } from "react";
import { AppContext } from "@/app/context/appContext";
import Image from "next/image";
import {  SearchIcon } from "lucide-react";

interface UserData {
  uid: string;
  avatar?: string;
  username?: string;
}

interface ChatData {
  rId: string;
  userData?: UserData;
  messageId?: string;
  updatedAt: number;
  messageSeen?: boolean; 
  lastMessage?: string; 
}


interface FetchedUser {
  id: string;
  avatar?: string;
  username?: string;
}

const LeftSideBar = () => {

  const { userData, chatData, setChatUser, setMessagesId } = useContext(AppContext);
  const [user, setUser] = useState<FetchedUser | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const inputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim().toLowerCase();
  
    if (!userData?.uid) {
      console.error("User data is not available.");
      return;
    }
  
    if (input) {
      setShowSearch(true);
      setLoading(true);
  
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input));
        const querySnap = await getDocs(q);
  
        if (!querySnap.empty && querySnap.docs[0].id !== userData.uid) {
          const docSnapshot = querySnap.docs[0];
          const fetchedUser = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          } as FetchedUser;
  
          // Type the chat parameter here
          const userExists = chatData.some((chat: ChatData) => chat.rId === fetchedUser.id);
  
          setUser(userExists ? null : fetchedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setShowSearch(false);
      setUser(null);
    }
  };
  
  const addChat = async () => {
    if (!user || !userData || !user.id || !userData.uid) {
      console.error("Invalid user or userData.");
      return;
    }
  
    const chatExists = chatData.some((chat: ChatData) => chat.rId === user.id);
    if (chatExists) return;
  
    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
  
    try {
      const newMessagesRef = doc(messagesRef);
      await setDoc(newMessagesRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
  
      const newChatData: ChatData = {
        messageId: newMessagesRef.id,
        lastMessage: "", 
        rId: userData.uid,
        updatedAt: Date.now(),
        messageSeen: true,
      };
  
      await updateDoc(doc(chatsRef, user.id), {
        chatData: arrayUnion(newChatData),
      });
      await updateDoc(doc(chatsRef, userData.uid), {
        chatData: arrayUnion({ ...newChatData, rId: user.id }),
      });
    } catch (error) {
      console.error("Error adding chat:", error);
    }
  };
  
  

  const setChat = (item: ChatData) => {
    setMessagesId(item.messageId);
    setChatUser(item);
  };


  return (
    <div className="w-1/4 p-8 flex flex-col gap-4 bg-gray-100 border-r-2">
      <div className="flex bg-white rounded-xl border border-l-0 p-2">

        <input
          type="text"
          onChange={inputHandler}
          placeholder="Энд хайх ..."
          className="w-full rounded-xl focus:outline-none"
        />
        <SearchIcon />

      </div>

      {showSearch && (
        <div className="mt-5 ml-5" onClick={addChat}>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="flex w-52 items-center cursor-pointer">
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt={`${user.username || "User"}'s avatar`}
                width={70}
                height={70}
                className="rounded-full"
              />
              <p className="text-2xl ml-6 font-bold">{user.username}</p>
            </div>
          ) : (

            <p className="text-gray-500">No user found</p>

          )}
        </div>
      )}
      {chatData.length > 0 ? (
        <div className="mt-4 space-y-4">
          {chatData.map((item : any, index : any) => (
            <div
              key={index}

              className="flex items-center gap-4 p-3 bg-blue-100 rounded-lg cursor-pointer"

              onClick={() => setChat(item)}
            >
              <Image
                src={item.userData?.avatar || "/default-avatar.png"}
                alt={`${item.userData?.username || "User"}'s avatar`}
                width={50}
                height={50}
                className="rounded-full"
              />
              <p className="text-lg font-bold">
                {item.userData?.username.toUpperCase()}
              </p>
              <p>{item.lastMessage}</p>
            </div>
          ))}
        </div>
      ) : (

        <p className=" p-2">No chats available</p>

      )}
    </div>
  );
};

export default LeftSideBar;
