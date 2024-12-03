import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UcapanTerimakasih = () => {
  // Data ringkasan
  const summary = {
    Nama: "Mohammad Ade Irawan",
    Tanggal: "3 Desember, 2024",
    Jumlah: "Rp.2.000.000",
    Method: "BRI Virtual Account",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <Card className="w-full max-w-lg shadow-lg rounded-lg p-8 bg-white">
        {/* Ikon centang dengan animasi */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                className="animate-draw-circle"
              />
              <path
                d="M9 12l2 2 4-4"
                className="animate-draw-check"
              />
            </svg>
          </div>
        </div>

        {/* Teks ucapan terima kasih */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Thank You!</h1>
          <p className="text-2xl text-gray-600">Payment Successful!</p>
        </div>

        {/* Informasi Ringkasan */}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 mb-4">
            Your Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-gray-700 space-y-2 text-left">
            <p>
              <strong>Nama:</strong> {summary.Nama}
            </p>
            <p>
              <strong>Tanggal:</strong> {summary.Tanggal}
            </p>
            <p>
              <strong>Jumlah:</strong> {summary.Jumlah}
            </p>
            <p>
              <strong>Metode Pembayaran:</strong> {summary.Method}
            </p>
          </div>
        </CardContent>

        {/* Tombol Aksi */}
        <div className="text-center mt-8">
          <Button className="bg-black hover:bg-green-500 text-white text-xl px-6 py-3 rounded-md">
            Kembali ke Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UcapanTerimakasih;
