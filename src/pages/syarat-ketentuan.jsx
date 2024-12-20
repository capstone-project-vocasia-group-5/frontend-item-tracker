import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { ScrollArea } from "../components/ui/scroll-area.jsx";

const SyaratKetentuan = () => {
  return (
    <div>
      <Navbar />
      <h1 className="py-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        Syarat dan Ketentuan
      </h1>
      <div className="flex justify-center pb-10 px-4 ">
        {" "}
        <ScrollArea className=" w-[400px] md:w-[550px] lg:w-[850px] h-[600px] bg-primaryBlack rounded-md border p-6 text-white text-justify">
          {" "}
          <div className="terms-container">
            <h5 className="text-xl font-bold">
              Selamat Datang di Item Tracker!
            </h5>
            <p>
              Dengan menggunakan aplikasi ini, Anda menyetujui Syarat dan
              Ketentuan berikut. Harap baca dengan saksama sebelum melanjutkan
              penggunaan layanan kami.
              <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Definisi</h5>
            <p>
              1. <b>Barang Hilang:</b> Barang yang dilaporkan oleh pengguna
              sebagai hilang.
            </p>
            <p>
              2. {""}
              <b>Barang Temuan:</b> Barang yang dilaporkan oleh pengguna sebagai
              barang yang ditemukan.
            </p>
            <p>
              {" "}
              3. {""}
              <b>Pengguna:</b> Setiap orang yang mengakses dan menggunakan
              aplikasi Item Tracker. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Kewajiban Pengguna</h5>
            <p>
              Pengguna wajib memberikan informasi yang benar dan akurat tentang
              barang hilang atau temuan.
            </p>
            <p>
              Pengguna dilarang mengunggah konten yang bersifat palsu, melanggar
              hukum, atau menyinggung pihak lain.
            </p>
            <p>
              Pengguna bertanggung jawab atas aktivitas mereka di dalam
              aplikasi. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">
              Hak Akses dan Penggunaan Aplikasi
            </h5>
            <p>
              Aplikasi ini hanya boleh digunakan untuk mencari barang hilang
              atau melaporkan barang temuan.
            </p>
            <p>
              Item Tracker berhak menangguhkan atau menghentikan akses pengguna
              yang melanggar aturan.
              <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Batasan Tanggung Jawab</h5>
            <p>
              Item Tracker hanya menyediakan platform untuk menghubungkan
              pemilik barang dan penemu. Kami tidak bertanggung jawab atas klaim
              kepemilikan yang salah atau kesalahpahaman antara pengguna. <br />{" "}
              <br />
            </p>

            <h5 className="text-xl font-bold">Pembaruan dan Perubahan</h5>
            <p>
              Kami berhak memperbarui fitur, layanan, dan Syarat dan Ketentuan
              ini tanpa pemberitahuan sebelumnya. Pengguna diharapkan memeriksa
              pembaruan secara berkala. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Hukum yang Berlaku</h5>
            <p>
              Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di
              Indonesia. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Kontak</h5>
            <p>
              Jika ada pertanyaan atau keluhan, silakan hubungi kami di{" "}
              <a href="mailto:itemtrackerteam@gmail.com">
                itemtrackerteam@gmail.com
              </a>
              . <br />
            </p>
          </div>
        </ScrollArea>
      </div>

      <Footer />
    </div>
  );
};

export default SyaratKetentuan;
