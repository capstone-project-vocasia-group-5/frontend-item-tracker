import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { FoundList } from "../components/organisms/found-list.jsx";
import { HeaderFix } from "../components/organisms/header-fix.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { FiturUtama } from "../components/organisms/fitur-utama.jsx";
import { Separator } from "@/components/ui/separator";
import ReportButton from "../components/organisms/upload-section.jsx";
import { useState } from "react";
<<<<<<< Updated upstream
import { useAuth } from "../context/auth-context";
=======
import FlowSection from "../components/organisms/flow.jsx";
>>>>>>> Stashed changes

const Homepage = () => {
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Navbar />
      <div id="header">
        <HeaderFix />
      </div>
      <main className="mx-auto max-w-screen-xl">
        {/* SearchBar */}
        <div className="w-full mt-10">
          <SearchBar onSearch={handleSearch} onReset={handleReset} />
        </div>

        {isAuthenticated && (
          <div className="max-w-screen-xl mx-auto mt-10">
            <ReportButton />
          </div>
        )}

        {/* Lost Section */}
        <div id="LostSection">
          <h1 className="px-1 mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Temukan dan Laporkan{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Barang Anda !
            </span>
          </h1>
          <LostList params={{ ...searchParams, type: "lost" }} />
        </div>
        <Separator />

        {/* Found Section */}
        <div id="FoundSection" className="pb-10">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Barang Temuan{" "}
            </span>
          </h1>
          <FoundList params={{ ...searchParams, type: "found" }} />
        </div>
        <Separator />

        {/* Flow Section */}
        <div id="FlowSection" className="bg-gray-200 pb-10">
          <h1 className="pt-10 mb-4 text-2xl text-left lg:text-center px-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Panduan Penggunaan{" "}
            </span>
          </h1>
          <FlowSection />
        </div>
        <Separator />

        {/* 10 Fitur Utama */}
        <div id="fiturUtama" className="max-w-screen-xl mx-auto">
          <h1 className="mt-12 mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            10{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Fitur Utama
            </span>{" "}
          </h1>
          <FiturUtama />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
