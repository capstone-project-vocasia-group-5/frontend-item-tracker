import React from "react";
import { Card } from "../components/ui/card.jsx";
import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import LogoItemTracker from "../components/atoms/logo-item-tracker.jsx";
import KamiCard from "../components/molecules/kami-card.jsx";
import "./css/contact-us.css";
import { Link } from "react-router-dom";

const TentangKami = () => {
  const members = [
    {
      name: "Agus Heryanto",
      role: "FullStack Web Developer",
      github: "https://github.com/agusheryanto182",
      instagram: "https://www.instagram.com/agusheryanto182/",
      linkedin: "https://www.linkedin.com/in/agus-heryanto-b34561284/",
      photo:
        "https://res.cloudinary.com/dukylmpmy/image/upload/v1734449259/profile_1_1_sl7bra.png",
    },
    {
      name: `Aisyah Lailia Sari`,
      role: "FullStack Web Developer",
      github: "https://github.com/aisyahbelajar",
      instagram: "https://www.instagram.com/aisyahlailia/",
      linkedin: "https://www.linkedin.com/in/aisyahlailia/",
      photo:
        "https://res.cloudinary.com/dukylmpmy/image/upload/v1734449257/IMG-20241212-WA0016_1_2_1_cplz33.png",
    },
    {
      name: "Anisa Ayu Yandani",
      role: "FullStack Web Developer",
      github: "https://github.com/NisaayU",
      instagram: "https://www.instagram.com/annissaa_ay/",
      linkedin: "https://www.linkedin.com/in/anisa-ayu-yandani-79334b263/",
      photo:
        "https://res.cloudinary.com/dukylmpmy/image/upload/v1734449258/removal.ai__ebca4e0d-4600-4bd3-b628-f731cca0af80-whatsapp-image-2024-12-12-at-17-16-13-1_1_1_fujl9s.png",
    },
    {
      name: "M. Ade Irawan",
      role: "FullStack Web Developer",
      github: "https://github.com/adeirawan18",
      instagram: "https://www.instagram.com/adeeirawan._/",
      linkedin: "https://www.linkedin.com/in/adeirawann/",
      photo:
        "https://res.cloudinary.com/dukylmpmy/image/upload/v1734449257/removal.ai__d6275a54-0057-4751-ac16-0623a46e5792-whatsapp-image-2024-12-12-at-17-18-59_1_ww8i56.png",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}

      <Navbar />
      <header className="bg-black text-white">
        <div className="container max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16">
          {/* Gambar Header */}
          <div className="md:w-1/2">
            <img
              src="/image/logo-3-white.svg"
              alt="ItemTrack Hero"
              className="rounded-lg shadow-lg w-[50%] mx-auto"
            />
          </div>

          {/* Konten Teks */}
          <div className="w-full md:w-2/3 mt-8 md:mt-0 md:ml-8 text-left">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Sekilas Tentang{" "}
              <LogoItemTracker className={`text-[#656bfb] text-4xl`} />
            </h1>
            <p className="text-lg leading-relaxed mb-6">
              Item Tracker adalah solusi digital yang membantu anda melacak
              barang hilang dengan mudah.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 max-w-screen-xl py-12">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          Visi, Misi & Tujuan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-8 p-6 flex flex-col justify-between">
            {/* Visi */}
            <Card className="bg-black rounded-lg shadow-md border border-transparent transition-all duration-300 hover:border-white hover:shadow-2xl p-4 h-full">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2 h-12">
                  Visi Kami
                </h3>
                <p className="text-white leading-relaxed mb-2 p-2">
                  Menjadi platform pelacakan barang terdepan yang dipercaya oleh
                  masyarakat global.
                </p>
              </div>
            </Card>

            {/* Misi */}
            <Card className="bg-black rounded-lg shadow-md border border-transparent transition-all duration-300 hover:border-white hover:shadow-2xl p-4 h-full">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2 h-12">
                  Misi Kami
                </h3>
                <p className="text-white leading-relaxed mb-2 p-2">
                  Membantu setiap individu menemukan barang yang hilang dengan
                  solusi teknologi yang sederhana, andal, dan efisien.
                </p>
              </div>
            </Card>
          </div>

          {/* Kolom Tujuan */}
          <div className="h-full p-6">
            <Card className="bg-black rounded-lg shadow-md border border-transparent transition-all duration-300 hover:border-white hover:shadow-2xl h-full">
              <div className="p-4 h-full">
                <h3 className="text-2xl font-semibold text-white mb-4 p-2">
                  Tujuan Kami
                </h3>
                <ul className="text-white leading-relaxed space-y-4 text-left p-6">
                  {/* Item 1 */}
                  <li className="flex items-center md:items-start">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4">
                      1
                    </button>
                    <span className="flex-grow">
                      Memberikan solusi pelacakan barang yang akurat dan
                      terpercaya bagi semua pengguna.
                    </span>
                  </li>
                  {/* Item 2 */}
                  <li className="flex items-center md:items-start">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4">
                      2
                    </button>
                    <span className="flex-grow">
                      Membangun komunitas yang mendukung kolaborasi dan berbagi
                      informasi antar pengguna.
                    </span>
                  </li>
                  {/* Item 3 */}
                  <li className="flex items-center md:items-start">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4">
                      3
                    </button>
                    <span className="flex-grow">
                      Terus mengembangkan inovasi teknologi untuk memenuhi
                      kebutuhan pengguna secara global.
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Konten Utama */}
      <main className="container mx-auto min-h-screen max-w-full py-12 px-6">
        <section className="mb-12 max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">Tim Kami</h2>
          <div className="flex flex-wrap justify-center  gap-4">
            {members.map((member, index) => (
              <KamiCard
                key={index}
                name={member.name}
                role={member.role}
                github={member.github}
                instagram={member.instagram}
                linkedin={member.linkedin}
                photo={member.photo}
              />
            ))}
          </div>
        </section>
      </main>
      <div className="m-4">
        <section className="bg-gray-200 py-10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center  ">
            {/* Kolom Kiri */}

            <div className="lg:w-1/3 mb-10 lg:mb-0 text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 ">
                Pintu kami selalu terbuka!
              </h2>

              <p className="text-gray-600 text-lg">
                Jangan ragu untuk mengirimkan pertanyaan atau pesan kepada kami.
              </p>
            </div>

            <div className="flex items-center">
              <Link to="/contact">
                <button className="contactButton">
                  Hubungi
                  <div className="iconButton">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </Link>
            </div>

            {/* Kolom Kanan */}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TentangKami;
