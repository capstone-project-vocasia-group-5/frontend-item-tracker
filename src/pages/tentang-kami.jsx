import React from "react";
import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { Button } from "../components/ui/button.jsx";

const TentangKami = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}

      <Navbar></Navbar>
      <header className="bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16">
          {/* Gambar Header */}
          <div className="w-full md:w-1/2">
            <img
              src="https://s3-alpha-sig.figma.com/img/1d67/cdcc/05befe3f77b9a8c0ac8d124fe7a9b5b5?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=be0FaleGdPtcinZb7GkNVcrTdBGcmDW~UBXgwZ72TZwipO6cJGepjz25J66CP2IukHE9RujLnJPAjJcX5Wa4n~Wa1EanjCQw27eyW1LwmPuFTKzalZA9R88eVRVFGOGK~YT-SCZfUA8uzy5uP6p~tNzVZY3EexmTmm3TNhnS09V3RoGCZvh-va-u~k~-jO616YEf53IYQTq~DwgxJLvIzDbm4IfKxft-DPqfdHnkZwN-5nUeqc5CAF95otINccY4AWqMRWGGFyo6ggoj5Z0tt0fOs0PdcEShDm2KGdVHKk4Lz2t9G3IqsqwEnnrP9LTLMGRn8A5sBXDzeTwBWBBWtw__"
              alt="ItemTrack Hero"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Konten Teks */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8 text-left">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Sekilas Tentang <span className="text-blue-500">ItemTrack</span>
            </h1>
            <p className="text-lg leading-relaxed mb-6">
              itemTrack adalah solusi digital yang membantu Anda melacak barang
              hilang dengan mudah. Misi kami adalah memberikan platform inovatif
              untuk memastikan barang Anda dapat ditemukan dengan cepat dan
              efisien.
            </p>
          </div>
        </div>
      </header>
      {/* Konten Utama */}
      <main className="container mx-auto py-12 px-6">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Anggota Tim 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Agus Heryanto
              </h3>
              <p className="text-sm text-gray-600 text-center">Web Developer</p>
            </div>

            {/* Anggota Tim 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Aisyah Lailia
              </h3>
              <p className="text-sm text-gray-600 text-center">Web Developer</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Annisa
              </h3>
              <p className="text-sm text-gray-600 text-center">Web Developer</p>
            </div>

            {/* Anggota Tim 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Ade
              </h3>
              <p className="text-sm text-gray-600 text-center">Web Developer</p>
            </div>
          </div>
        </section>
      </main>
      <div className="m-4">
        <section className="bg-gray-200 py-10">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start  text-left">
            {/* Kolom Kiri */}

            <div className="lg:w-1/3 mb-10 lg:mb-0">
              <h2 className="text-5xl font-bold text-gray-800 mb-4 ">
                Pintu kami selalu terbuka!
              </h2>

              <p className="text-gray-600 text-lg">
                Jangan ragu untuk mengirimkan pertanyaan atau pesan kepada kami.
              </p>
            </div>

            {/* Kolom Kanan */}

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Komplain & Bantuan Pengguna
                </h3>

                <p className="text-gray-600">support@itemtrack.com</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Sekretaris Perusahaan
                </h3>

                <p className="text-gray-600">corpsec@itemtrack.com</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Hubungan Investor
                </h3>

                <p className="text-gray-600">investor@itemtrack.com</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Kebutuhan Media
                </h3>

                <p className="text-gray-600">media@itemtrack.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default TentangKami;
