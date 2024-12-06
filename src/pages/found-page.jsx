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
      <div className="max-w-screen-xl mx-auto p-4">
        {" "}
        <SearchBar />
        <ReportButton />
        {/* Lost Section */}
        <div id="LostSection">
          <h1 className="mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Barang temuan
          </h1>

          <FoundList />
        </div>
        <PaginationDisplay />
      </div>
      {/* SearchBar */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundPage;
