import { cn } from "@/lib/utils";
import { BookType } from "@/types";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

type BookCardProps = {
  className: string;
  book: BookType;
  width: number;
  height: number;
  aspectRatio: "portrait" | "square";
};

const IconButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Button
      variant="ghost"
      className="flex items-center w-full justify-start gap-2"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

export const BookCard: React.FC<BookCardProps> = ({
  className,
  book,
  width,
  height,
  aspectRatio,
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={book.image}
        alt={book.name}
        width={width}
        height={height}
        className={cn(
          "rounded-md object-cover transition-all hover:scale-105",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      />
      <div className="flex justify-between items-center">
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{book.name}</h3>
          <p className="text-xs text-muted-foreground">{book.type}</p>
        </div>

        <Popover>
          <PopoverTrigger>
            <Ellipsis size={16} />
          </PopoverTrigger>
          <PopoverContent className="space-y-2 w-fit p-1">
            <IconButton icon={<Pencil size={16} />} label={"Edit"} />
            <IconButton icon={<Trash2 size={16} />} label={"Delete"} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
