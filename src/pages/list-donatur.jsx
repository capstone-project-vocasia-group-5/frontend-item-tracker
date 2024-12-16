import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { getDonations } from "../api/api";
import Preloader from "../components/templates/preloader/preloader";

const Donatur = () => {
  const [investors, setInvestors] = useState([]);
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchDonations = async () => {
      try {
        const response = await getDonations();
        if (isMounted) {
          const donations = response.data.data.donations;

          // Unique Name (Case insensitive)
          const uniqueInvestors = Array.from(
            new Set(
              donations
                .filter((donation) => donation.amount >= 10000000)
                .map((donation) => donation.name.toLowerCase())
            )
          ).map((name) =>
            donations.find((donation) => donation.name.toLowerCase() === name)
          );

          const uniqueDonators = Array.from(
            new Set(
              donations
                .filter((donation) => donation.amount < 10000000)
                .map((donation) => donation.name.toLowerCase())
            )
          ).map((name) =>
            donations.find((donation) => donation.name.toLowerCase() === name)
          );

          setInvestors(uniqueInvestors);
          setDonators(uniqueDonators);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDonations();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col ">
      {loading && <Preloader />}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 md:px-8 max-w-screen-xl ">
        <h1 className="text-center text-4xl font-bold mb-6 text-gray-800 mt-8">
          Donatur Kami
        </h1>

        {/* Investors Section */}
        <div className="mb-6">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold mb-4 text-gray-700">
              Donatur (&gt; IDR 10 JUTA)
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-md shadow-sm p-6">
            {investors.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-gray-600">
                {investors.map((investor, index) => (
                  <p key={index} className="text-center">
                    {investor.name}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Belum ada donatur.</p>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-gray-600">
                {donators.map((donator, index) => (
                  <p key={index} className="text-center">
                    {donator.name}
                  </p>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center">
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
                  src="/image/logoKM.png"
                  alt="Logo Kampus Merdeka"
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

      <footer className="mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default Donatur;
