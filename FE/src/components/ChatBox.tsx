"use client";
import { AppContext } from "@/app/context/appContext";
import Image from "next/image";
import { db } from "@/config/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext, useEffect, useState, useRef } from "react";

interface Message {
  sId: string;
  text: string;
  createdAt: Date | { seconds: number };
}

interface ChatItem {
  messageId: string;
  lastMessage: string;
  updatedAt: number;
  rId: string;
  messageSeen?: boolean;
}

const ChatBox = () => {
  const { userData, setMessages, messages, chatUser, messagesId } = useContext(AppContext);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: Date | { seconds: number }) => {
    if (!timestamp) return "";
    let date: Date;

    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp.seconds !== undefined) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      console.warn("Invalid timestamp format:", timestamp);
      return "";
    }

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        const fetchedMessages = res.data()?.messages || [];
        setMessages(fetchedMessages);
      });
      return () => unSub();
    }
  }, [messagesId, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const messageText = newMessage.trim();
    if (!messageText || !messagesId) return;

    setNewMessage(""); 

    try {
      await updateDoc(doc(db, "messages", messagesId), {
        messages: arrayUnion({
          sId: userData.uid,
          text: messageText,
          createdAt: new Date(),
        }),
      });

      const userIDs = [chatUser.rId, userData.id];
      for (const id of userIDs) {
        const userChatRef = doc(db, "chats", id);
        const userChatsSnapShot = await getDoc(userChatRef);

        if (userChatsSnapShot.exists()) {
          const userChatData = userChatsSnapShot.data();
          const chatData = userChatData.chatData as ChatItem[];

          if (Array.isArray(chatData)) {
            const chatIndex = chatData.findIndex((c) => c.messageId === messagesId);
            if (chatIndex !== -1) {
              chatData[chatIndex].lastMessage = messageText.slice(0, 30);
              chatData[chatIndex].updatedAt = Date.now();
              if (chatData[chatIndex].rId === userData.id) {
                chatData[chatIndex].messageSeen = false;
              }
              await updateDoc(userChatRef, { chatData });
            } else {
              console.warn("Chat not found in chatData");
            }
          } else {
            console.error("chatData is not an array:", chatData);
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-3/4 h-full flex flex-col bg-gray-50 p-8">
      {chatUser && chatUser.userData ? (
        <div className="flex items-center mb-4">
          <Image
            src={chatUser.userData.avatar || "/default-avatar.png"}
            alt={`${chatUser.userData.username}'s avatar`}
            width={70}
            height={70}
            className="rounded-full"
          />
          <p className="ml-4 font-bold text-lg">
            {chatUser.userData.username.toUpperCase()}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-center mb-4">
          Select a chat to start messaging
        </p>
      )}

      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {messages.map((msg: Message, index: number) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.sId === userData.uid
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black mr-auto"
            } max-w-xs`}
          >
            {msg.text}
            <div className="text-xs text-gray-500 mt-1 text-right">
              {msg.createdAt && formatTimestamp(msg.createdAt)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center">
        <Input
          type="text"
          className="flex-1 p-2 border rounded-md mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
