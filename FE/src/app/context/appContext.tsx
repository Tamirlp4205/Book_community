/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useState, FC, ReactNode, useEffect } from 'react';
import { db } from '@/config/firebase';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  username: string;
  email: string;
  createdAt: Date;
  avatar: string;
  bio: string;
  lastSeen: number;
}

interface Chat {
  id: string;
  messages: Array<{ id: string; text: string; timestamp: number }>;
  userData?: UserData; 
  updatedAt : number;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  chatData: Chat[]; 
  setChatData: (data: Chat[]) => void; 
  loadUserData: (uid: string) => void;
  messages: { id: string; text: string; timestamp: number }[];
  setMessages: (messages: { id: string; text: string; timestamp: number }[]) => void;
  messagesId: any;
  setMessagesId: (id: any) => void; 
  chatUser: any; 
  setChatUser: (user: any) => void; 
}


export const AppContext = createContext<AppContextType | any>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chatData, setChatData] = useState<Chat[]>([]); 
  const [messagesId, setMessagesId] = useState<string | null>(null); 
  const [messages, setMessages] = useState<{ id: string; text: string; timestamp: number }[]>([]);
  const [chatUser,setChatUser] = useState (null)

  const loadUserData = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data() as UserData;
        setUserData(userData);
        await updateDoc(userRef, { lastSeen: Date.now() });
      } else {
        console.error('No such user data found!');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
        if (userData && userData.uid) {
            try {
                const userRef = doc(db, 'users', userData.uid);
                await updateDoc(userRef, { lastSeen: Date.now() });
                console.log("Last seen updated every 30 seconds for user:", userData.uid);
            } catch (error) {
                console.error("Error updating last seen:", error);
            }
        }
    }, 30000); 

    return () => clearInterval(intervalId);
}, [userData]);

  
useEffect(() => {
  if (userData) {
    const chatRef = doc(db, "chats", userData.uid);

    const unSub = onSnapshot(chatRef, async (res) => {
      const chatItems = res.data()?.chatData || []; 
      console.log(chatItems)

      const tempData: Chat[] = [];

      await Promise.all(
        chatItems.map(async (item : any) => {

          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data() as UserData;
            tempData.push({ ...item, userData });
          } else {
          }
        })
      );
      setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unSub();
  }
}, [userData]);




  const value: AppContextType = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,setMessages ,
    messagesId,setMessagesId,
    chatUser,setChatUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
