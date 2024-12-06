import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { Separator } from "@/components/ui/separator";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import ReportButton from "../components/organisms/upload-section.jsx";

const LostPage = () => {
  return (
    <div className="">
      <Navbar />
      {/* SearchBar */}
      <div className="max-w-screen-xl mx-auto p-4">
        <SearchBar />
        <ReportButton />

        {/* Lost Section */}
        <div id="LostSection">
          <h1 className="mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Barang Hilang
          </h1>

          <LostList />
        </div>

        <PaginationDisplay />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LostPage;
