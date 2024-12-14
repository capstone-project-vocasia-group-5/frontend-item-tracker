import React from "react";
import { useNavigate } from "react-router-dom"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SliderOther from "../molecules/slider-other";

const FlowSection = () => {
  const navigate = useNavigate(); 

  const slides = [
    {
      title: "Selamat Datang di ItemTrack",
      content:
        "Login atau daftar untuk melaporkan barang hilang atau temuan Anda.",
      buttonText: "Login / Register",
      onClick: () => navigate("/login"),
    },
    {
      title: "Kehilangan Barang?",
      content:
        "Laporkan barang Anda yang hilang. Admin akan memverifikasi dalam 3x24 jam.",
      buttonText: "Laporkan Kehilangan",
      onClick: () => navigate("/report"),
    },
    {
      title: "Menemukan Barang?",
      content:
        "Laporkan barang yang Anda temukan untuk membantu pemilik menemukannya.",
      buttonText: "Laporkan Penemuan",
      onClick: () => navigate("/report"),
    },
    {
      title: "Ajukan Kepemilikan",
      content:
        "Ajukan barang Anda dengan bukti kepemilikan untuk mendapatkan konfirmasi.",
      buttonText: "Ajukan Barang",
      onClick: () => navigate("/found"),
    },
    {
      title: "Hubungi Pemilik Barang",
      content:
        "Temukan barang di halaman Kehilangan Barang dan hubungi pemiliknya.",
      buttonText: "Hubungi Pemilik",
      onClick: () => navigate("/lost"),
    },
    {
      title: "Lihat Status Laporan",
      content:
        "Pantau status laporan kehilangan atau penemuan barang Anda di dashboard.",
      buttonText: "Cek Status",
      onClick: () => navigate("/user"),
    },
  ];

  return (
    <Carousel className="px-4 mt-10">
      <CarouselPrevious className="absolute -top-8 lg:left-[90%] left-[73%]" />
      <CarouselNext className="absolute lg:right-[3%] -top-8 right-[6%]" />
      <CarouselContent className="-ml-1">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div
              className="p-1 cursor-pointer"
              onClick={slide.onClick} 
            >
              <SliderOther slide={slide} index={index} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FlowSection;