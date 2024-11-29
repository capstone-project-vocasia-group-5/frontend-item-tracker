import { Navbar } from "../components/organisms/Navbar.jsx";
import { Footer } from "../components/organisms/Footer.jsx";
import { FoundList } from "../components/organisms/FoundList.jsx";
import { SearchBar } from "../components/molecules/searchBar.jsx";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import ReportButton from "../components/organisms/UploadSection.jsx";

const FoundPage = () => {
  return (
    <div className="">
      <Navbar />
      {/* SearchBar */}
      <SearchBar />
      <div className="md:max-w-2xl lg:max-w-5xl sm:max-w-xl max-w-sm mx-auto mt-10">
        <ReportButton />
      </div>

      {/* Lost Section */}
      <div id="LostSection">
        <h1 class="mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Barang temuan
        </h1>

        <FoundList />
      </div>
      <PaginationDisplay />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundPage;
