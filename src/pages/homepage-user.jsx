import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { FoundList } from "../components/organisms/found-list.jsx";
import { HeaderFix } from "../components/organisms/header-fix.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { FiturUtama } from "../components/organisms/fitur-utama.jsx";
import { Separator } from "@/components/ui/separator";
import ReportButton from "../components/organisms/upload-section.jsx";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />

      <div id="header">
        <HeaderFix />
      </div>
      <main className="mx-auto max-w-screen-xl">
        {/* SearchBar */}
        <div className="w-full mt-10">

          <SearchBar />
        </div>

        {/* Render ReportButton hanya di route "/after" */}
        {location.pathname === "/after" && (
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
          <LostList />
        </div>
        <Separator />

        {/* Found Section */}
        <div id="FoundSection">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Barang Temuan{" "}
            </span>
          </h1>
          <FoundList />
        </div>
        <Separator />

        {/* 10 Fitur Utama */}
        <div id="fiturUtama" className="max-w-screen-xl mx-auto">
          <h1 className="mt-12 mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            10{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Fitur Utama
            </span>{" "}
            ItemTrack
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
