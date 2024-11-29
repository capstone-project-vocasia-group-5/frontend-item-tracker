import { Navbar } from "../components/organisms/Navbar.jsx";
import { Footer } from "../components/organisms/Footer.jsx";
import { ScrollArea } from "../components/ui/scroll-area.jsx";

const KebijakanPrivasi = () => {
  return (
    <div>
      <Navbar />
      <h1 class="p-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Kebijakan Privasi
      </h1>
      <div className="flex justify-center pb-10">
        {" "}
        <ScrollArea className="w-[400px] md:w-[550px] lg:w-[850px] h-[450px] bg-primaryBlack rounded-md border p-6 text-white text-justify">
          {" "}
          <div></div>
          Privasi Anda penting bagi kami. Kebijakan ini menjelaskan bagaimana
          kami mengumpulkan, menggunakan, dan melindungi data Anda saat
          menggunakan aplikasi ItemTrack. <br /> <br />
          <h5 class="text-xl font-bold dark:text-white">
            Data yang Dikumpulkan :
          </h5>{" "}
          <p>1. Informasi pribadi seperti nama, email, dan nomor telepon.</p>{" "}
          <p>
            2. Informasi terkait barang hilang atau temuan (deskripsi, gambar,
            lokasi).
          </p>{" "}
          <p>
            3. Aktivitas Anda di aplikasi, termasuk pencarian dan pelaporan
            barang.
            <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">
            Tujuan Penggunaan Data
          </h5>{" "}
          <p>1. Menghubungkan pemilik barang dengan penemu barang.</p>{" "}
          <p>2. Menyediakan dan meningkatkan layanan kami.</p>{" "}
          <p>
            3. Mengirimkan pemberitahuan terkait layanan.
            <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">Pihak Ketiga</h5>{" "}
          <p>
            Kami tidak menjual data Anda kepada pihak ketiga. Namun, data dapat
            dibagikan kepada mitra kami jika diperlukan untuk mendukung layanan.
            <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">Keamanan Data</h5>{" "}
          <p>
            Kami menggunakan langkah-langkah teknis dan organisasi yang sesuai
            untuk melindungi data Anda dari akses tidak sah, kerugian, atau
            penyalahgunaan.
            <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">Hak Pengguna</h5>{" "}
          <p>
            1. Anda memiliki hak untuk mengakses, memperbarui, atau menghapus
            data Anda kapan saja.
          </p>{" "}
          <p>
            2. Anda dapat mencabut persetujuan Anda atas penggunaan data dengan
            menghubungi kami. <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">
            Penyimpanan Data
          </h5>{" "}
          <p>
            Data Anda akan disimpan selama diperlukan untuk tujuan yang
            dijelaskan dalam kebijakan ini, kecuali diharuskan penyimpanan lebih
            lama oleh hukum. <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">
            Pembaruan Kebijakan Privasi
          </h5>{" "}
          <p>
            Kami dapat memperbarui kebijakan ini sewaktu-waktu. Anda akan
            diberitahu jika ada perubahan signifikan.
            <br />
            <br />
          </p>{" "}
          <h5 class="text-xl font-bold dark:text-white">Kontak</h5>{" "}
          <p>
            Untuk pertanyaan lebih lanjut terkait privasi, silakan hubungi kami
            di [alamat email atau nomor telepon tim pengembang].
            <br />
            <br />
          </p>{" "}
        </ScrollArea>
      </div>

      <Footer />
    </div>
  );
};

export default KebijakanPrivasi;
