import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { Separator } from "@/components/ui/separator";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import ReportButton from "../components/organisms/upload-section.jsx";
import { useState } from "react";

const LostPage = () => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const handleTotalItemsUpdate = (total) => {
    setTotalItems(total);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams({});
  };
  return (
    <div>
      <Navbar />

      <main className="max-w-screen-xl min-h-screen mx-auto">
        <div id="LostSection">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
            Barang Hilang
          </h1>

          <SearchBar onSearch={handleSearch} onReset={handleReset} />
          <ReportButton />

          <LostList
            params={{
              ...searchParams,
              type: "lost",
              limit: "30",
              page: currentPage,
              matched_status: false,
            }}
            onTotalItemsUpdate={handleTotalItemsUpdate}
          />
        </div>

        <PaginationDisplay
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          limit={30}
        />
        <Separator />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LostPage;
