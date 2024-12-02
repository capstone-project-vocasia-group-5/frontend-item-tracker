import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { Button } from "../components/ui/button.jsx";
import React, { useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area.jsx";

const DetailItem = () => {
  const [mainImage, setMainImage] = useState(
    "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
  );
  const [status, setStatus] = useState("Masih Dicari");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Daftar gambar kecil
  const thumbnails = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  ];

  const [comments, setComments] = useState([
    {
      profile: "https://via.placeholder.com/40/FF5733/FFFFFF?text=P",
      name: "Penemu",
      date: "10 September 2024",
      description: "Tolong temukan barang saya",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setComments([
        ...comments,
        {
          profile: "https://via.placeholder.com/40/FF5733/FFFFFF?text=U",
          name: "User",
          date: formattedDate,
          description: newComment,
        },
      ]);

      setNewComment(""); // Reset input field
    }
  };
  return (
    <div>
      <Navbar />
      {/* Fitur Utama */}

      <div className="flex flex-wrap">
        <div className="w-[100%] sm:w-[50%] lg:p-5 lg:m-5 p-9">
          <div className="grid gap-4">
            {/* Div untuk gambar utama */}
            <div>
              <img
                className="h-[auto] max-w-full rounded-lg"
                src={mainImage}
                alt="Main"
              />
            </div>
            {/* Grid untuk thumbnail */}
            <div className="grid grid-cols-5 gap-4">
              {thumbnails.map((image, index) => (
                <div key={index}>
                  <img
                    className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-80"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setMainImage(image)} // Saat gambar diklik, set main image
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-left sm:p-5 sm:m-4 px-9 pb-9 rounded-lg ">
          <h2 className="text-3xl font-semibold text-gray-900 my-6">Meong</h2>
          <p className="text-sm text-gray-700 my-4">
            Terakhir Terlihat:{" "}
            <span className="font-semibold my-4">23 Juni 2024</span>
          </p>
          <div className="my-4">
            <label className="text-sm text-gray-700 mr-2 font-medium">
              Status:
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className={`p-1 rounded-full focus:outline-none focus:ring-2 ${
                status === "Masih Dicari"
                  ? "bg-yellow-100 text-yellow-800 ring-yellow-500"
                  : status === "Ditemukan"
                  ? "bg-green-100 text-green-800 ring-green-500"
                  : "bg-gray-100 text-gray-800 ring-gray-500"
              }`}
            >
              <option value="Masih Dicari">Masih Dicari</option>
              <option value="Ditemukan">Ditemukan</option>
              <option value="Tidak Diketahui">Tidak Diketahui</option>
            </select>
          </div>
          <p className="text-sm text-gray-700 my-4">
            Deskripsi:{" "}
            <span className="font-medium">
              Kucing Hitam kalau ngomong bilang meong
            </span>
          </p>

          <div className="flex items-center mt-4 space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M16.3197 0.833374C7.48384 2.62737 0.833008 10.4397 0.833008 19.8065C0.833008 30.4995 9.50017 39.1667 20.1933 39.1667C29.56 39.1667 37.3723 32.5159 39.1663 23.68"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.2978 31.5C34.0106 31.3496 34.6967 31.0931 35.3333 30.7391M25.152 30.2369C26.2956 30.7352 27.3926 31.1058 28.4429 31.3486M17.8054 25.6503C18.597 26.2062 19.4442 26.8732 20.2683 27.4482M2.75 23.4998C3.36717 23.1989 4.03417 22.852 4.78742 22.5549M9.3625 21.9167C10.4397 22.0355 11.6472 22.3441 13.0157 22.9191M31.5 11.375C31.5 10.6125 31.1971 9.88123 30.6579 9.34207C30.1188 8.8029 29.3875 8.5 28.625 8.5C27.8625 8.5 27.1312 8.8029 26.5921 9.34207C26.0529 9.88123 25.75 10.6125 25.75 11.375C25.75 12.1375 26.0529 12.8688 26.5921 13.4079C27.1312 13.9471 27.8625 14.25 28.625 14.25C29.3875 14.25 30.1188 13.9471 30.6579 13.4079C31.1971 12.8688 31.5 12.1375 31.5 11.375Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.5181 23.105C30.0002 23.5762 29.3245 23.836 28.6244 23.8334C27.9243 23.836 27.2486 23.5762 26.7307 23.105C22.079 18.804 15.846 13.997 18.8858 7.02037C20.5303 3.24646 24.4748 0.833374 28.6244 0.833374C32.774 0.833374 36.7185 3.24837 38.3611 7.02037C41.399 13.9894 35.1794 18.8175 30.5181 23.105Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-lg font-medium text-gray-900">
              Kota: Surabaya
            </h2>
          </div>

          <Button className="mt-4 px-6 py-2 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Hubungi Pemilik
          </Button>
        </div>
      </div>
      <div className="flex justify-center pb-10 m-8">
        {" "}
        <ScrollArea className="w-full  h-[450px] bg-[#D9D9D9] text-black rounded-md border p-6 text-justify">
          {" "}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Komentar</h3>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <img
                    src={comment.profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {comment.name} -{" "}
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </p>
                    <p className="text-gray-700">{comment.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-6 space-x-2">
              <img
                src="https://via.placeholder.com/40/FF5733/FFFFFF?text=U"
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                className="flex-grow p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bottom-0"
                placeholder="Tambahkan komentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none"
                onClick={handleAddComment}
              >
                ➤
              </button>
            </div>
          </div>
        </ScrollArea>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailItem;
