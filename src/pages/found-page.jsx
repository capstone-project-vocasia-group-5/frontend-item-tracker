import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { FoundList } from "../components/organisms/found-list.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import ReportButton from "../components/organisms/upload-section.jsx";

const FoundPage = () => {
  return (
    <div className="">
      <Navbar />

      <main className="max-w-screen-xl mx-auto">
        <div id="FoundSection">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Barang Temuan
          </h1>

          <div className="mt-8 flex justify-between flex-col md:flex-row items-center gap-2 px-4 ">
            <SearchBar />
            <ReportButton />
          </div>

          <FoundList />
        </div>
        <PaginationDisplay />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundPage;
