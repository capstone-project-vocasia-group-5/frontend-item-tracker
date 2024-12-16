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
        "https://s3-alpha-sig.figma.com/img/5e24/f81d/b91f5061028f4737046bbc134c9800f1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pi94nsqa8agSGni25UMo97At-sRD1-58KYgbd33lUEdzvv5X5izHHeJEyD-w~tARTmqOHX2CTBcRNyUohVvBYdoodwa3fYYZEqJa8WDBUedcIttItxJSBj2hDNulFS9PUwrBSTWzP~kzzHzE9qjoViNgd9SbwV-VkqyPSGlsAD~5geCgb~LnRnHfp2u03rLBmw4RwjshJ9z2YG4rgMdKlgCsvpjunyNn6~sJqDT5VyDAHTUvYF0qdGGykatzbh~MxmxJ5BMS8OpBCCljDgssqquD-skE2ksJPgmJPRNDxHRu-s1~M084ndvr-axpzgIW5wrhoOjliU3sbOmvniP9XA__",
    },
    {
      name: `Aisyah Lailia Sari`,
      role: "FullStack Web Developer",
      github: "https://github.com/aisyahbelajar",
      instagram: "https://www.instagram.com/aisyahlailia/",
      linkedin: "https://www.linkedin.com/in/aisyahlailia/",
      photo:
        "https://s3-alpha-sig.figma.com/img/c94f/405d/3329b48656723464fa39a225d0f78be9?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CV3wRyLDDm98tr6m17ZstCUl-RCYrczIHDDyWWi~Aem~koUk3wtTyZvU1O8XkMTa-p5~IEj2Jepe0V6Dhn2--5Up1UvhPTumSphFZNHFzfTvmduK5MnDP0CT~GfLk~LfhoFCsjRMe8fGzTeQ49eAfR~g40ECEoET7gpvcrwMQcKlH1PRElsDFUEogRjJJnm5T3O9WZ6m-VCiTAovaSEDNcW6bn4V6X7ebBEXC9c9ol~UFLq3r~OVLykXo23uRwRSiOR7dqXiDLhSWnbq1FJuKmB0mW20lchUPWqepUY4NNHNg0a0i0B3l97BgZWtmqXKYy3BAx2h3olgFZAfP2MP-g__",
    },
    {
      name: "Anisa Ayu Yandani",
      role: "FullStack Web Developer",
      github: "https://github.com/NisaayU",
      instagram: "https://www.instagram.com/annissaa_ay/",
      linkedin: "https://www.linkedin.com/in/anisa-ayu-yandani-79334b263/",
      photo:
        "https://s3-alpha-sig.figma.com/img/5991/0bce/699cbbbe9c32ddff55dcd16af7446b93?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q0tgyhaxwdiG62IISOrMo~F-s4FxiflckPhsixDbiDpzhmHevYML1ZbEol5P9ZlZW1f3S1uBi05FY40kAs~kQ2WU8OU2OonLoilU0CwxCf5-S3cFCLxN4GpZjLGfiIsEW9yN9d7YeWWFXKA-tWCCaau54vokArauf11IrwBpAzHtfq4a9C3BhNovbsyRg6ih26ANsyrANzibWawi2G3beH8EE59TMjldDCDRu8ng32gxIewMHVUaZUQnZCqgazc-4u7maOJtHhIllp3yNAIjMLNp0sfNqHWY8ehB3sfJI0NXUnG29sPrwColkQflKIp2UYSuV3W-h7Zkimdug8vrQA__",
    },
    {
      name: "M. Ade Irawan",
      role: "FullStack Web Developer",
      github: "https://github.com/adeirawan18",
      instagram: "https://www.instagram.com/adeeirawan._/",
      linkedin: "https://www.linkedin.com/in/adeirawann/",
      photo:
        "https://s3-alpha-sig.figma.com/img/46b2/c194/2eb3402c3ef01fde5fde08e0ee047600?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sr3BMu5wmlEODiLvH70JuFJx3Re16I4d8h-X2AC0~G37bXpPCeRM4BvDD~QmCZYilOlIMd6L1JZVN2oqLbuok6KVE5Wg1bQd1-XBXNB6RLVNxBjwy0nSTmohcC9WGGaiO6S6rErzthcmq4H3vtfrlnUx9mI6x6wFIwcI5Zl06gLXK~2hfwQbkkYY~whvx6vyOpSHeewAy3xOgg-IlHKQhfPKDLKVplXocJzXd0fxR8urIPIdpgnFo1St6uTg3ViYW~315j3M-hVlIW6ibZrhUTrdVdVmNJuEqVe6fgAmWWnEPPtZ3nWtUSQOntwc7EbSZmIvG8eQ2LD0dxzjuS0jqw__",
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

      <section className="container mx-auto px-6 max-w-full py-12">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">Visi, Misi & Tujuan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-8 p-6 flex flex-col justify-between">
            {/* Visi */}
            <Card className="bg-black rounded-lg shadow-md border border-transparent transition-all duration-300 hover:border-white hover:shadow-2xl p-4 h-full">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2 h-12">Visi Kami</h3>
                <p className="text-white leading-relaxed mb-2 p-2">
                  Menjadi platform pelacakan barang terdepan yang dipercaya oleh masyarakat global.
                </p>
              </div>
            </Card>

            {/* Misi */}
            <Card className="bg-black rounded-lg shadow-md border border-transparent transition-all duration-300 hover:border-white hover:shadow-2xl p-4 h-full">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2 h-12">Misi Kami</h3>
                <p className="text-white leading-relaxed mb-2 p-2">
                  Membantu setiap individu menemukan barang yang hilang dengan solusi teknologi yang sederhana, andal, dan efisien.
                </p>
              </div>
            </Card>
          </div>

          {/* Kolom Tujuan */}
          <div className="h-full p-6">
            <Card className="bg-black rounded-lg shadow-md border border-transparent transition-all duration-300 hover:border-white hover:shadow-2xl h-full">
              <div className="p-4 h-full">
                <h3 className="text-2xl font-semibold text-white mb-4 p-2">Tujuan Kami</h3>
                <ul className="text-white leading-relaxed space-y-4 text-left p-6">
                  {/* Item 1 */}
                  <li className="flex items-center md:items-start">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4">
                      1
                    </button>
                    <span className="flex-grow">
                      Memberikan solusi pelacakan barang yang akurat dan terpercaya bagi semua pengguna.
                    </span>
                  </li>
                  {/* Item 2 */}
                  <li className="flex items-center md:items-start">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4">
                      2
                    </button>
                    <span className="flex-grow">
                      Membangun komunitas yang mendukung kolaborasi dan berbagi informasi antar pengguna.
                    </span>
                  </li>
                  {/* Item 3 */}
                  <li className="flex items-center md:items-start">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4">
                      3
                    </button>
                    <span className="flex-grow">
                      Terus mengembangkan inovasi teknologi untuk memenuhi kebutuhan pengguna secara global.
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
                <button class="contactButton">
                  Hubungi
                  <div class="iconButton">
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
