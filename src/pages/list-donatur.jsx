import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";

const Donatur = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-center text-4xl font-bold mb-6 text-gray-800 mt-8">
          Donatur Kami
        </h1>

        {/*Investors Section */}
        <div className="mb-6">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
              Investor (&gt; IDR 10 JUTA)
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-md shadow-sm p-6">
            <ul className="list-none space-y-2 text-left text-gray-600">
              <li>Bambang Pamungkas</li>
              <li>Boaz Salosa</li>
              <li>Willie Salim</li>
              <li>Deny Sumargo</li>
            </ul>
          </CardContent>
        </div>

        {/* Relawan & Kontributor Section */}
        <div className="mb-6">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
              Donatur (&lt; IDR 10 JUTA)
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-md shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-left text-gray-600">
              {[
                "Adi Sudeva", "Aichida Ul-Alfaha", "Albert Boenardi", "Allisa Sepastihka",
                "Andhyta Firselly Utami", "Andi Taufan", "Arana Dharma Budisantoso",
                "Arie Satria", "Asep Iwan Gunawan", "Astrid Felicia", "Bagus Satria",
                "Bakti Luddin", "Bayu Kurniadi", "Belva Devara", "Billie Setiawan",
                "Bin Anindita", "Budiman Wikasra", "Catherine Hindra", "Chrina Messakh",
                "Danu Wicaksana", "Diana Baely", "Dimas Nurdian Syah W.",
              ].map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </div>
          </CardContent>
        </div>

        {/* Mitra Section */}
        <div>
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
              Mitra
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-md shadow-sm p-6">
            <p className="text-left text-gray-600 mb-8">
              Berikut pihak-pihak yang telah terlibat dalam proses pengembangan:
            </p>
            <div className="flex justify-between items-center gap-4">
              <div className="flex justify-center">
                <img
                  src="/image/logoUnej.png"
                  alt="Logo Unej"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="/image/logoAmikom.png"
                  alt="Logo Amikom"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="/image/logoVocasia.png"
                  alt="Logo Vocasia"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="/image/logoUnsika.png"
                  alt="Logo Unsika"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="/image/logoUnesa.png"
                  alt="Logo Unesa"
                  className="w-24 h-24 object-contain"
                />
              </div>    
            </div>
          </CardContent>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default Donatur;