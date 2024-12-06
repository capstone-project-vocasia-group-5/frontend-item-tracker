import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { Separator } from "@/components/ui/separator";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import ReportButton from "../components/organisms/upload-section.jsx";

const LostPage = () => {
  return (
    <div>
      <Navbar />

      <main className="max-w-screen-xl mx-auto">
        <div id="LostSection">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Barang Hilang
          </h1>

          <div className="mt-8 flex justify-between flex-col md:flex-row items-center gap-2 px-4 ">
            <SearchBar />
            <ReportButton />
          </div>

          <LostList />
        </div>

        <PaginationDisplay />
        <Separator />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LostPage;
