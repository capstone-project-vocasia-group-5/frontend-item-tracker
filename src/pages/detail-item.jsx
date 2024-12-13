import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import Komentar from "../components/organisms/komentar.jsx";
import { Button } from "../components/ui/button.jsx";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "../components/ui/scroll-area.jsx";
import {
  getComment,
  updateComment,
  deleteComment,
  createComment,
  getItemById,
  getCommentByItemId,
} from "../api/api";

import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { formatDate, formatTime } from "../utils/time-formatter.js";
import Preloader from "../components/templates/preloader/preloader.jsx";
import BackButton from "../components/organisms/back-button.jsx";
import { useNavigate } from "react-router-dom";

const DetailItem = () => {
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [status, setStatus] = useState("Dicari");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClickAjukan = () => {
    navigate(`/proof-of-submission/${id}`);
  };

  const handleClickHubungi = () => {
    if (item?.item?.phone_number) {
      const url = `https://wa.me/${item.item.phone_number}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Nomor telepon tidak tersedia");
    }
  };

  const handleClickBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        setItem(response.data.data);
        if (response.data.data.item.type === "found") {
          setStatus("Ditemukan");
        }
        setMainImage(response.data.data.item.images[0]);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getCommentByItemId(id);
        setComments(response.data.data.comment);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchItem();

    fetchComments();
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

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

      setNewComment("");
    }
  };

  return (
    <div>
      <Navbar />
      {/* Fitur Utama */}
      {isLoading && <Preloader />}
      <div className="max-w-screen-xl min-h-screen mx-auto">
        {" "}
        <div className="mt-4 px-4">
          <BackButton handleClickBack={handleClickBackButton} />
        </div>
        <div className="flex md:flex-row mt-4 md:mt-6 flex-col w-full">
          <div className="w-[100%] sm:w-[50%] px-4">
            <div className="grid gap-4">
              {/* Div untuk gambar utama */}
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={mainImage}
                  alt="Main"
                />
              </div>
              {/* Grid untuk thumbnail */}
              <div className="grid grid-cols-5 gap-4 items-center">
                {item?.item?.images.map((image, index) => (
                  <div key={index}>
                    <img
                      className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-80"
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setMainImage(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-left w-[100%] sm:w-[50%] px-4  rounded-lg ">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 my-6">
                {item?.item?.name}
              </h2>
              <p className="text-md text-gray-700 my-4">
                Diupload pada :{" "}
                <span className="font-semibold my-4">
                  {item?.item?.created_at
                    ? formatDate(item.item.created_at)
                    : "Tanggal tidak tersedia"}
                </span>
              </p>
              <p className="text-md text-gray-700 my-4">
                Waktu :{" "}
                <span className="font-semibold my-4">
                  {item?.item?.created_at
                    ? formatTime(item.item.created_at)
                    : "Tanggal tidak tersedia"}
                </span>
              </p>
              <div className="my-4">
                <label className="text-md text-gray-700 mr-2 font-medium">
                  Status :
                </label>
                <div
                  className={`inline-block px-4 py-1 rounded-full text-white font-medium ${
                    status === "Dicari"
                      ? "bg-red-500"
                      : status === "Ditemukan"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {status}
                </div>
              </div>

              <p className="text-md text-gray-700 my-4">
                Deskripsi:{" "}
                <span className="font-medium">{item?.item?.description}</span>
              </p>

              <div className="flex items-center mt-4 space-x-2">
                <h2 className="text-lg font-medium text-gray-900 uppercase">
                  {`${item?.item?.province}, ${item?.item?.city}, ${item?.item?.subdistrict} ${item?.item?.village}, ${item?.item?.postal_code}`}
                </h2>
              </div>
            </div>

            <div className="mt-4 flex justify-start items-center">
              {item?.item?.type === "found" ? (
                <Button
                  onClick={handleClickAjukan}
                  className="mt-2 px-6 py-2 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Ajukan Kepemilikan
                </Button>
              ) : (
                <Button
                  onClick={handleClickHubungi}
                  className="mt-2 px-6 py-2 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Hubungi Pemilik
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          {" "}
          <Komentar comments={comments} item={item?.item} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailItem;
