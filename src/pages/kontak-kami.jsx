import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import LogoItemTracker from "../components/atoms/logo-item-tracker.jsx";
import { toast } from "sonner";
import Preloader from "../components/templates/preloader/preloader.jsx";
import { sendEmail } from "../api/api.js";

const KontakKami = () => {
  const [isLoading, setIsLoading] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendEmail({
        name,
        email,
        subject,
        message,
      });
      toast.success("Pesan berhasil dikirim!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Preloader />}
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <main className="container mx-auto py-12 px-4 pd-6">
        <h1 className="text-3xl font-bold text-center mb-16">Kontak Kami</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulir Kontak */}
          <Card className="p-6 md:col-span-2 md:ml-16">
            <form className="space-y-4 text-left">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  required
                  className="h-12 mb-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Alamat Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Alamat Email Anda"
                  required
                  className="h-12 mb-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="subject"
                >
                  Subyek Pesan <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subyek Pesan"
                  required
                  className="h-12 mb-6"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="message"
                >
                  Isi Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full h-72 border bg-white rounded-md p-2"
                  placeholder="Tuliskan pesan Anda..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <Button onClick={handleSubmit} type="submit" className="w-full">
                Kirim
              </Button>
            </form>
          </Card>

          {/* Informasi Kontak */}
          <Card className="p-6 bg-black text-white mr-16 text-left md:ml-auto w-full sm:w-[300px] md:w-[360px] h-96">
            <div className="flex items-center justify-center mb-4 mt-4 space-x-3">
              <img
                src="/image/logo-3-white.svg"
                alt="ItemTrack Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              <LogoItemTracker className={`text-3xl`} />
            </div>
            <h2 className="ml-4 mb-8 mt-8 text-2xl font-bold">Sosial Media</h2>
            <p className="mt-4 ml-4 flex items-center ">
              <FontAwesomeIcon icon={faInstagram} size="2x" className="mr-4" />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg"
              >
                @ItemTracker
              </a>
            </p>
            <p className="mt-4 ml-4 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="mr-4" />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=itemtrackerteam@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg"
              >
                itemtrackerteam@gmail.com
              </a>
            </p>
            <p className="mt-4 ml-4 flex items-center">
              <FontAwesomeIcon icon={faGithub} size="2x" className="mr-4" />
              <a
                href="https://github.com/orgs/capstone-project-vocasia-group-5/repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg"
              >
                ItemTracker
              </a>
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default KontakKami;
