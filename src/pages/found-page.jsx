import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { FoundList } from "../components/organisms/found-list.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import ReportButton from "../components/organisms/upload-section.jsx";
import { useState } from "react";

const FoundPage = () => {
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
        <div id="FoundSection">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
            Barang Temuan
          </h1>

          <SearchBar onSearch={handleSearch} onReset={handleReset} />
          <ReportButton />

          <FoundList
            params={{
              ...searchParams,
              type: "found",
              limit: "12",
              page: currentPage,
            }}
            onTotalItemsUpdate={handleTotalItemsUpdate}
          />
        </div>

        <PaginationDisplay
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          limit={12}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundPage;
