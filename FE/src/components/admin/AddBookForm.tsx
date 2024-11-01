"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useRef, useState, useContext } from "react";
import { upload } from "../../app/upload/upload";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { AppContext } from "@/app/context/appContext";

export const AddBookForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);
  const { userData } = useContext(AppContext);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || !userData) return;

    try {
      const imgUrl = avatar ? await upload(avatar) : prevImage;
      if (!imgUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
      setPrevImage(imgUrl);

      const formData = new FormData(formRef.current);
      const bookData = {
        username: userData.username,
        userId: userData.uid,
        name: formData.get("name"),
        author: formData.get("author"),
        summary: formData.get("summary"),
        type: formData.get("type"),
        bookImg: imgUrl,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "books"), bookData);
      setOpen(false);
      location.reload()
      toast.success("Book created successfully.");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book.");
    }
  };

  const onOpenChange = () => setOpen((prev) => !prev);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 text-primary-foreground bg-primary bg-blue-600 w-40 flex justify-end ">
          <PlusCircle size={16} />
          <span className="font-medium">Add new book</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create new book</DialogTitle>
          <DialogDescription>
            Enter details for the new book and click Done when you’re finished.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input name="name" id="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                name="author"
                id="author"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="summary" className="text-right">
                Summary
              </Label>
              <Textarea
                name="summary"
                id="summary"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <select name="type" id="type" className="col-span-3" required>
                <option value="">Select type</option>
                <option value="Утга зохиол">Утга зохиол</option>
                <option value="Шинжлэх ухаан">Шинжлэх ухаан</option>
                <option value="Нийгэм">Нийгэм</option>
                <option value="Хувь хүний хөгжил">Хувь хүний хөгжил</option>
                <option value="Хүүхдийн">Хүүхдийн</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                Avatar
              </Label>
              <Input
                type="file"
                onClick={(e) => {
                  (e.target as HTMLInputElement).value = ""; 
                }}
                onInput={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    setAvatar(file);
                  }
                }}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Done</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
