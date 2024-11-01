"use client";
import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { upload } from "../upload/upload";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Textarea } from "@/components/ui/textarea";


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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!prevImage && !avatar) {
      toast.error("Please upload an image");
      return;
    }
    try {
      const userRef = doc(db, "users", uid);
      const imgUrl = avatar ? await upload(avatar) : prevImage;

      if ((await getDoc(userRef)).exists()) {
        await updateDoc(userRef, { username, bio, avatar: imgUrl });
      } else {
        await setDoc(userRef, { username, bio, avatar: imgUrl });
      }

      toast.success("Мэдээлэл амжилттай хадгалагдлаа!");
      router.push("/chat");

      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setUserData(updatedSnap.data());
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Error occurred while saving the data. Please try again.");
    }
  };

  return (
    <div className="w-full flex h-screen justify-center items-center">
      <div className="w-[1440px] flex flex-col items-center h-full">
        <Navbar />
        <div className="p-10 w-[440px] h-full items-center flex flex-col gap-10">
          <h2 className="text-[48px] font-bold">Profile</h2>
          <div>
            <Avatar className="w-[150px] h-[150px] border-solid border-[1px] border-[#d1d5db]">
              <AvatarImage
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : prevImage ||
                      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
              />
            </Avatar>
          </div>
          <p className="text-[34px]">{username}</p>

          <div className="flex flex-col gap-2 w-full">
            <label className="block text-sm font-medium text-gray-700">Avatar</label>
            <Input type="file" onChange={handleAvatarChange} className="w-full" />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Bio Input */}
          <div className="flex flex-col gap-2 w-full">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <Button onClick={handleSave} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Мэдээлэл хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
