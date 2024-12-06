import { CardDemo } from "../molecules/card";

export const FoundList = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center p-4 gap-2 max-w-screen-xl mx-auto w-full">
        <CardDemo type="found" />
      </div>
    </div>
  );
};
