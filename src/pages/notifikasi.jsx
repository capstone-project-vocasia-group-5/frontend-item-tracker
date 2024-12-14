import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { Notif } from "../components/organisms/notif.jsx";
import { setAllNotificationIsRead } from "../api/api.js";
import { toast } from "sonner";
import { useAuth } from "../context/auth-context.jsx";

const Notifikasi = () => {
  const { user } = useAuth();

  const handleSetAllNotificationIsRead = async () => {
    try {
      const response = await setAllNotificationIsRead();
      if (response.status === 200) {
        toast.success("Semua notifikasi telah dibaca");
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.errors || "Terjadi kesalahan");
      }
      toast.error("Terjadi kesalahan");
    }
  };
  return (
    <div>
      {user.role === "admin" ? "" : <Navbar />}
      <main className="max-w-screen-xl min-h-screen mx-auto">
        <header className="flex justify-between">
          <h1 className="text-2xl p-4 font-bold">Notifikasi</h1>
          <h1
            onClick={handleSetAllNotificationIsRead}
            className="text-base p-4 font-bold text-[#656bfb]  cursor-pointer"
          >
            Sudah dibaca
          </h1>
        </header>
        <div className="max-w-screen-xl mx-auto">
          <Notif role={user?.role} />
        </div>
      </main>
      {user.role === "admin" ? "" : <Footer />}
    </div>
  );
};

export default Notifikasi;
