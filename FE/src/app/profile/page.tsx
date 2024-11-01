"use client";
import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { upload } from "../upload/route";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

const Profile = () => {
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const router = useRouter();
  const { setUserData } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
          setBio(data.bio || "");
          setPrevImage(data.avatar || null);
        } else {
          console.error("No such document!");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!prevImage && !avatar) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const imgUrl = avatar ? await upload(avatar) : prevImage;

      if (docSnap.exists()) {
        await updateDoc(userRef, { username, bio, avatar: imgUrl });
      } else {
        await setDoc(userRef, { username, bio, avatar: imgUrl });
      }

      toast("Мэдээлэл амжилттай хадгалагдлаа!");
      router.push("/chat");

      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setUserData(updatedSnap.data());
      }

      router.push("/chat");
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Error occurred while saving the data. Please try again.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="p-4  rounded  w-full h-screen items-center flex flex-col mt-10">
        <Avatar className="w-[150px] h-[150px]">
          <AvatarImage
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : prevImage || "https://github.com/shadcn.png"
            }
          />
        </Avatar>
        <h2 className="text-xl font-bold">{username} Profile</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Avatar
          </label>
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setAvatar(e.target.files[0]);
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Мэдээлэл хадгалах
        </button>
      </div>
    </div>
  );
};

export default Profile;
