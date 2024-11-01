import { BookHome } from "@/components/BookHome";
import { Navbar } from "@/components/Navbar";

const Page = async () => {

  return (
    <div className="w-full p-6">
      <Navbar /> 
      <div className="w-full flex justify-end">
        <BookHome/>
      </div>
    </div>
  );
};

export default Page;
