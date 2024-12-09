import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { getDonations } from "../api/api";

const Donatur = () => {
  const [investors, setInvestors] = useState([]);
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
  
        // Memanggil API untuk mendapatkan data donasi
        const response = await getDonations();
        console.log("API Response:", response.data); // Debugging untuk memastikan data diterima
  
        // Pastikan Anda mengakses data sesuai dengan struktur yang diberikan
        const donations = response.data.data.donations;
  
        // Filter berdasarkan jumlah donasi
        const investorsList = donations.filter(donation => donation.amount > 10000000);
        const donatorsList = donations.filter(donation => donation.amount <= 10000000);
  
        // Set hasil filter ke dalam state
        setInvestors(investorsList);
        setDonators(donatorsList);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDonations();
  }, []);
  

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-8 px-4 md:px-8">
        <h1 className="text-center text-4xl font-bold mb-6 text-gray-800 mt-8">
          Donatur Kami
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading data...</p>
        ) : (
          <>
            {/* Investors Section */}
            <div className="mb-6">
              <CardHeader>
                <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
                  Investor (&gt; IDR 10 JUTA)
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white rounded-md shadow-sm p-6">
                {investors.length > 0 ? (
                  <ul className="list-none space-y-2 text-left text-gray-600">
                    {investors.map((investor, index) => (
                      <li key={index}>{investor.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">Belum ada investor.</p>
                )}
              </CardContent>
            </div>

            {/* Donators Section */}
            <div className="mb-6">
              <CardHeader>
                <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
                  Donatur (&lt; IDR 10 JUTA)
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white rounded-md shadow-sm p-6">
                {donators.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-left text-gray-600">
                    {donators.map((donator, index) => (
                      <p key={index}>{donator.name}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Belum ada donatur.</p>
                )}
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
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default Donatur;
