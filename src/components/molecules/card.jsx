import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllItemsByUser } from "../../api/api";
import { useEffect, useState } from "react";

export function CardDemo({ params, type, className, ...props }) {
  const [cardItem, setCardItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCardItem() {
      try {
        const res = await getAllItemsByUser(params);
        if (isMounted) {
          const items = res.data?.data?.items || [];
          setCardItems(items);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }

    fetchCardItem();

    return () => {
      isMounted = false;
    };
  }, [params]);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {cardItem
        .filter((card) => card.type === type)
        .map((card) => (
          <Card
            className={cn(
              "w-[180px] hover:bg-gray-100 relative group overflow-hidden grid sm:w-[160px] md:w-[170px] lg:w-[180px] flex-grow flex-shrink-0 basis-[160px] border rounded-md shadow-md",
              className
            )}
            {...props}
          >
            {/* Konten Hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Lihat Detail
            </div>

            {/* Konten Utama */}
            <CardContent className="grid ">
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
