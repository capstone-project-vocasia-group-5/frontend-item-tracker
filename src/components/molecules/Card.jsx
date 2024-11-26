import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo({ className, ...props }) {
  return (
    <Card
      className={cn(
        "w-[180px] hover:bg-gray-100 relative group overflow-hidden grid sm:w-[180px] md:w-[190px] lg:w-[200px] mb-4",
        className
      )}
      {...props}
    >
      {/* Konten Hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Lihat Detail
      </div>

      {/* Konten Utama */}
      <CardContent className="grid">
        <div className="flex justify-center mt-3">
          <img
            src="https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__"
            alt=""
            className="w-32"
          />
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>Meong</CardTitle>
        <CardDescription>Kota : Surabaya </CardDescription>
      </CardHeader>
    </Card>
  );
}
