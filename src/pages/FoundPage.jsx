import { Navbar } from "../components/organisms/Navbar.jsx";
import { Footer } from "../components/organisms/Footer.jsx";
import { FoundList } from "../components/organisms/FoundList.jsx";
import { SearchBar } from "../components/molecules/searchBar.jsx";
import { Separator } from "@/components/ui/separator";

const FoundPage = () => {
  return (
    <div className="mt-[120px]">
      <Navbar />
      {/* SearchBar */}
      <SearchBar />

      {/* Lost Section */}
      <div id="LostSection">
        <h1 class="mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Barang temuan
        </h1>

        <FoundList />
        <FoundList />
        <FoundList />
      </div>
      <Separator />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundPage;
