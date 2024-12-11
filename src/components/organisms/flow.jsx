import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Slider from "../molecules/slider";
import SliderOther from "../molecules/slider-other";

const FlowSection = () => {
  const slides = [
    {
      title: "Selamat Datang di ItemTrack",
      content:
        "Login atau daftar untuk melaporkan barang hilang atau temuan Anda.",
      buttonText: "Login / Register",
    },
    {
      title: "Kehilangan Barang?",
      content:
        "Laporkan barang Anda yang hilang. Admin akan memverifikasi dalam 3x24 jam.",
      buttonText: "Laporkan Kehilangan",
    },
    {
      title: "Menemukan Barang?",
      content:
        "Laporkan barang yang Anda temukan untuk membantu pemilik menemukannya.",
      buttonText: "Laporkan Penemuan",
    },
    {
      title: "Ajukan Kepemilikan",
      content:
        "Ajukan barang Anda dengan bukti kepemilikan untuk mendapatkan konfirmasi.",
      buttonText: "Ajukan Barang",
    },
    {
      title: "Hubungi Pemilik Barang",
      content:
        "Temukan barang di halaman Kehilangan Barang dan hubungi pemiliknya.",
      buttonText: "Hubungi Pemilik",
    },
    {
      title: "Lihat Status Laporan",
      content:
        "Pantau status laporan kehilangan atau penemuan barang Anda di dashboard.",
      buttonText: "Cek Status",
    },
  ];

  return (
    <Carousel className="px-4 mt-10">
      <CarouselPrevious className="absolute -top-8 lg:left-[90%] left-[73%]" />
      <CarouselNext className="absolute lg:right-[3%] -top-8 right-[6%]" />
      <CarouselContent className="-ml-1">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              {/* Pass slide and index to Slider */}
              {/* <Slider slide={slide} index={index} /> */}
              <SliderOther slide={slide} index={index} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FlowSection;
