import { CardDemo } from "../molecules/card";
import { useEffect, useState } from "react";
import { getAllItemsByUser } from "../../api/api";
import Preloader from "../templates/preloader/preloader";

export const LostList = ({ params, onTotalItemsUpdate }) => {
  const [cardItems, setCardItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function fetchCardItem() {
      try {
        const res = await getAllItemsByUser(params);
        const items = res.data?.data?.items || [];
        const total = res.data?.data?.total_items || 0;
        setCardItems(items);
        onTotalItemsUpdate(total);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCardItem();
  }, [params]);
  return (
    <div className=" flex justify-center">
      {isLoading && <Preloader />}
      <div className="flex flex-wrap justify-center p-4 gap-2 w-full">
        <CardDemo cardItem={cardItems} />
      </div>
    </div>
  );
};
