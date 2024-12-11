import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function CardDemo({ cardItem, className, ...props }) {
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/item/detail/${id}`);
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {cardItem?.map((card) => (
        <Card
          key={card._id}
          id={card._id}
          className={cn(
            "relative flex flex-col items-center justify-center w-full transform transition-transform duration-300 hover:scale-105 group overflow-hidden border rounded-md shadow-md hover:bg-gray-100",
            className
          )}
          {...props}
        >
          {/* Konten Hover */}
          <div
            onClick={() => handleClick(card._id)}
            className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            Lihat Detail
          </div>

          {/* Konten Utama */}
          <CardContent className="grid">
            <div className="flex justify-center mt-3">
              <img
                src={card.images[0]}
                alt=""
                className="w-32 h-40 object-contain"
              />
            </div>
          </CardContent>

          <CardHeader>
            <CardTitle>{card.name}</CardTitle>
            <CardDescription>Kota : {card.city} </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
