import { useState, useEffect } from "react";
import dog from "/public/image/dog.jpg";
import cat from "/public/image/cat.jpg";
import key from "/public/image/key.jpg";

export const HeaderFix = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Daftar URL background
  const backgrounds = [
    "https://images.unsplash.com/photo-1585501954837-9d99d09aa2c1?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1648398673098-b4852da7eca6?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dog,
    cat,
    key,
  ];

  // Update background index setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000);

    // Membersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section
      className="bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
      style={{
        backgroundImage: `url(${backgrounds[currentBgIndex]})`,
      }}
    >
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Solusi Cerdas untuk Menemukan dan Melacak Barang Anda
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          ItemTrack menyediakan layanan inovatif untuk membantu Anda melaporkan,
          mencari, dan melacak barang hilang dengan mudah. Bersama kami,
          menemukan barang Anda menjadi lebih cepat dan efisien.
        </p>
      </div>
    </section>
  );
};
