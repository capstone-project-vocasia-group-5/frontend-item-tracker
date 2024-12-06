import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { LostList } from "../components/organisms/lost-list.jsx";
import { FoundList } from "../components/organisms/found-list.jsx";
import { HeaderFix } from "../components/organisms/header-fix.jsx";
import { SearchBar } from "../components/molecules/search-bar.jsx";
import { FiturUtama } from "../components/organisms/fitur-utama.jsx";
import { Separator } from "@/components/ui/separator";
import ReportButton from "../components/organisms/upload-section.jsx";

const HomepageAfterLogin = () => {
  return (
    <div>
      <Navbar />
      {/* Fitur Utama */}

      {/* SearchBar */}
      <SearchBar />
      <div className="md:max-w-2xl lg:max-w-5xl sm:max-w-xl max-w-sm mx-auto mt-10">
        <ReportButton />
      </div>

      {/* Lost Section */}
      <div id="LostSection" className="p-10">
        <h1 className="mt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Temukan dan Laporkan{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Barang Anda !
          </span>
        </h1>

        <LostList />
      </div>
      <Separator />
      {/* Found Section */}
      <div id="FoundSection" className="p-10">
        {" "}
        <h1 className="pt-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Barang Temuan
        </h1>
        <FoundList />
      </div>
      <Separator />
      {/* 10 Fitur Utama */}
      <div id="fiturUtama">
        <h1 className="mt-12 mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          10{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
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

export default HomepageAfterLogin;
