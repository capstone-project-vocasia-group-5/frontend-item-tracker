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

        {/* Angel Investors Section */}
        <div className="mb-6">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
              Angel Investors (&gt; IDR 10 JUTA)
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-md shadow-sm p-6">
            <ul className="list-none space-y-2 text-left text-gray-600">
              <li>Elizabeth Sillalah</li>
              <li>ICBC NISP</li>
              <li>Karadi Hamam</li>
              <li>Nico Krisnanto</li>
              <li>Suradi Hamam</li>
              <li>Yayasan Pendidikan Mandiri</li>
            </ul>
          </CardContent>
        </div>

        {/* Relawan & Kontributor Section */}
        <div className="mb-6">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
              Relawan & Kontributor (&lt; IDR 10 JUTA)
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
            <p className="text-left text-gray-600 mb-2">
              Berikut pihak-pihak yang telah memberikan bantuan:
            </p>
            <ul className="list-none space-y-2 text-left text-gray-600">
              <li>Vocasia</li>
            </ul>
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
