import { Navbar } from "../components/organisms/Navbar.jsx";
import { Footer } from "../components/organisms/Footer.jsx";
import { LostList } from "../components/organisms/LostList.jsx";
import { FoundList } from "../components/organisms/FoundList.jsx";
import { HeaderFix } from "../components/organisms/HeaderFix.jsx";
import { SearchBar } from "../components/molecules/searchBar.jsx";
import { FiturUtama } from "../components/organisms/FiturUtama.jsx";
import { Separator } from "@/components/ui/separator";

const HomePageDefault = () => {
  return (
    <div>
      <Navbar />
      {/* Fitur Utama */}
      <div className="mt-[70px]" id="header">
        <HeaderFix />
      </div>
      {/* SearchBar */}
      <SearchBar />
      {/* Lost Section */}
      <div id="LostSection">
        <h1 class="mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Temukan dan Laporkan{" "}
          <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Barang Anda !
          </span>
        </h1>

        <LostList />
      </div>
      <Separator />
      {/* Found Section */}
      <div id="FoundSection">
        {" "}
        <h1 class="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Barang Temuan
        </h1>
        <FoundList />
      </div>
      <Separator />
      {/* 10 Fitur Utama */}
      <div id="fiturUtama">
        <h1 class="mt-12 mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          10{" "}
          <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Fitur Utama
          </span>{" "}
          ItemTrack
        </h1>
        <FiturUtama />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePageDefault;
