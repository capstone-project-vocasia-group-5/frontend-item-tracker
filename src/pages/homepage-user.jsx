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
import { useAuth } from "../context/auth-context";
import FlowSection from "../components/organisms/flow.jsx";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";

const Homepage = () => {
  const [searchParams, setSearchParams] = useState({});
  const [totalFoundItems, setTotalFoundItems] = useState(0);
  const [totalLostItems, setTotalLostItems] = useState(0);
  const [currentPageFound, setCurrentPageFound] = useState(1);
  const [currentPageLost, setCurrentPageLost] = useState(1);

  const handlePageChangeFound = (newPage) => {
    setCurrentPageFound(newPage);
  };

  const handlePageChangeLost = (newPage) => {
    setCurrentPageLost(newPage);
  };

  const handleTotalFoundItemsUpdate = (total) => {
    setTotalFoundItems(total);
  };

  const handleTotalLostItemsUpdate = (total) => {
    setTotalLostItems(total);
  };

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
          <h1 className="pt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Temukan dan Laporkan{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-600">
              Barang Anda !
            </span>
          </h1>
          <LostList
            params={{ ...searchParams, type: "lost", limit: 12 }}
            onTotalItemsUpdate={handleTotalLostItemsUpdate}
          />
          <PaginationDisplay
            currentPage={currentPageLost}
            totalItems={totalLostItems}
            onPageChange={handlePageChangeLost}
            limit={12}
            className="mt-6"
          />
        </div>
        <Separator />

        {/* Found Section */}
        <div id="FoundSection" className="pb-10">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-600">
              Barang Temuan{" "}
            </span>
          </h1>
          <FoundList
            params={{ ...searchParams, type: "found", limit: 12 }}
            onTotalItemsUpdate={handleTotalFoundItemsUpdate}
          />
          <PaginationDisplay
            currentPage={currentPageFound}
            totalItems={totalFoundItems}
            onPageChange={handlePageChangeFound}
            limit={12}
            className="mt-6"
          />
        </div>
        <Separator />
      </main>

      {/* Flow Section */}
      <div id="FlowSection" className="bg-gray-200 pb-10">
        <h1 className="pt-10 mb-4 text-2xl text-left lg:text-center px-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
          <span className="underline underline-offset-3 decoration-8 decoration-blue-600">
            Panduan Penggunaan{" "}
          </span>
        </h1>
        <div className="max-w-screen-xl mx-auto">
          <FlowSection />
        </div>
      </div>
      <Separator />

      {/* 10 Fitur Utama */}
      <div id="fiturUtama" className="max-w-screen-xl mx-auto">
        <h1 className="mt-12 mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          10{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-blue-600">
            Fitur Utama
          </span>{" "}
        </h1>
        <FiturUtama />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
