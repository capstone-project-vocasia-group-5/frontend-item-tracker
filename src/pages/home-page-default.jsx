import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { FoundList } from "../components/organisms/found-list.jsx";
import { HeaderFix } from "../components/organisms/header-fix.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { FiturUtama } from "../components/organisms/fitur-utama.jsx";
import { Separator } from "@/components/ui/separator";
import ReportButton from "../components/organisms/upload-section.jsx";

const HomePageDefault = () => {
  return (
    <div>
      <Navbar />

      <div id="header">
        <HeaderFix />
      </div>

      <main className="mx-auto max-w-screen-xl">
        <div>
          <h1 className=" mt-16 mb-16 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Temukan dan Laporkan{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Barang Anda !
            </span>
          </h1>
        </div>

        <div className="mt-8 flex justify-between flex-col md:flex-row items-center gap-2 px-4 ">
          <SearchBar />
          <ReportButton />
        </div>

        {/* Lost Section */}
        <div id="LostSection">
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Barang Hilang !
            </span>
          </h1>
          <LostList />
        </div>
        <Separator />

        {/* Found Section */}
        <div id="FoundSection">
          {" "}
          <h1 className="pt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Barang Temuan !
            </span>
          </h1>
          <FoundList />
        </div>
        <Separator />

        {/* 10 Fitur Utama */}
        <div id="fiturUtama" className="max-w-screen-xl mx-auto">
          <h1 className="mt-12 mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            10{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Fitur Utama
            </span>{" "}
          </h1>
          <FiturUtama />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePageDefault;
