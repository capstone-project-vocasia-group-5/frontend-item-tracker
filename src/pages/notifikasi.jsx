import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { Notif } from "../components/organisms/notif.jsx";

const Notifikasi = () => {
  return (
    <div className="">
      <Navbar />
      <header className="flex justify-center">
        <h1 className="text-2xl p-4 font-bold">Notifikasi</h1>
      </header>
      <div className="max-w-screen-xl">
        <Notif />
      </div>

      <Footer />
    </div>
  );
};

export default Notifikasi;
