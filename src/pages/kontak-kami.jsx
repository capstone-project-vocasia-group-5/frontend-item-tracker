import React from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import emailjs from "emailjs-com";
import { Button } from "../components/ui/button.jsx";

const KontakKami = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
        },
        "YOUR_USER_ID"
      )
      .then(
        (response) => {
          alert("Pesan berhasil dikirim!");
          reset();
        },
        (error) => {
          alert("Gagal mengirim pesan. Coba lagi.");
        }
      );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex sm:flex-row flex-col">
        {/* Header */}
        <div className="flex flex-col items-center justify-center bg-black py-10 px-4 text-white">
          <img
            src="https://s3-alpha-sig.figma.com/img/1d67/cdcc/05befe3f77b9a8c0ac8d124fe7a9b5b5?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=be0FaleGdPtcinZb7GkNVcrTdBGcmDW~UBXgwZ72TZwipO6cJGepjz25J66CP2IukHE9RujLnJPAjJcX5Wa4n~Wa1EanjCQw27eyW1LwmPuFTKzalZA9R88eVRVFGOGK~YT-SCZfUA8uzy5uP6p~tNzVZY3EexmTmm3TNhnS09V3RoGCZvh-va-u~k~-jO616YEf53IYQTq~DwgxJLvIzDbm4IfKxft-DPqfdHnkZwN-5nUeqc5CAF95otINccY4AWqMRWGGFyo6ggoj5Z0tt0fOs0PdcEShDm2KGdVHKk4Lz2t9G3IqsqwEnnrP9LTLMGRn8A5sBXDzeTwBWBBWtw__"
            alt="Kontak Kami Icon"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-4xl font-bold">Kontak Kami</h1>
          <p className="mt-2 text-lg text-center">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan
            atau masukan.
          </p>
        </div>

        {/* Form Section */}
        <div className="container mx-auto py-10 px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto md:max-w-2xl">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Formulir Kontak
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Input Nama */}
              <div>
                <label className="block text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full p-3  text-white rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nama Anda"
                />
              </div>

              {/* Input Telepon */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Telepon/WhatsApp
                </label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="w-full p-3 text-white rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nomor Telepon/WhatsApp"
                />
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full  text-white p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Email Anda"
                />
              </div>

              {/* Input Pesan */}
              <div>
                <label className="block text-gray-700 mb-2">Pesan</label>
                <textarea
                  {...register("message", { required: true })}
                  className="w-full p-3  text-white rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tuliskan pesan Anda di sini"
                  rows="5"
                ></textarea>
              </div>

              {/* Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-gray-700">Saya bukan robot</label>
              </div>

              {/* Tombol Submit */}
              <Button
                type="submit"
                className="w-full text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
              >
                Kirim
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KontakKami;
