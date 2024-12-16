import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "../components/ui/scroll-area.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  updateComment,
  deleteComment,
  createComment,
  getItemById,
  getCommentByItemId,
} from "../api/api";
import { useAuth } from "../context/auth-context";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  formatDate,
  formatTime,
  formatDateTimeComment,
} from "../utils/time-formatter.js";
import Preloader from "../components/templates/preloader/preloader.jsx";
import BackButton from "../components/organisms/back-button.jsx";
import { useNavigate } from "react-router-dom";
import "./css/detail-item.css";

const DetailItem = () => {
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [status, setStatus] = useState("Dicari");
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const { user } = useAuth();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const toggleDropdown = (commentId) => {
    setOpenDropdownId((prevId) => (prevId === commentId ? null : commentId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdownId !== null &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId].contains(event.target)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

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

  const fetchItem = async () => {
    try {
      const response = await getItemById(id);
      setItem(response.data.data);
      if (response.data.data.item.type === "found") {
        setStatus("Sedang Mencari Pemilik");
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

  useEffect(() => {
    fetchItem();
    fetchComments();
  }, []);

  const handleCreateComment = async () => {
    if (newCommentText.trim()) {
      try {
        const response = await createComment(id, {
          comment_text: newCommentText,
        });
        if (response?.status === 201) {
          await fetchComments();
          setNewCommentText("");
          toast.success("Komentar berhasil dibuat");
        }
      } catch (error) {
        console.error("Error creating comment:", error);
        if (error.response) {
          toast.error(error.response.data?.errors || "Terjadi kesalahan");
        }
      }
    }
  };

  const handleUpdateComment = async () => {
    if (editCommentText.trim()) {
      try {
        await updateComment(editCommentId, { comment_text: editCommentText });
        setEditCommentId(null);
        setEditCommentText("");
        await fetchComments();
        toast.success("Komentar berhasil diperbarui");
      } catch (error) {
        console.error("Error updating comment:", error);
        if (error.response) {
          toast.error(error.response.data?.errors || "Terjadi kesalahan");
        }
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
      toast.success("Komentar berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Gagal menghapus komentar.");
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
                  className="h-[auto] max-w-full rounded-lg"
                  src={mainImage}
                  alt="Main"
                />
              </div>
              {/* Grid untuk thumbnail */}
              <div className="grid grid-cols-5 gap-4">
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
              <p className="text-sm text-gray-700 my-4">
                Diupload pada :{" "}
                <span className="font-semibold my-4">
                  {item?.item?.created_at
                    ? formatDate(item.item.created_at)
                    : "Tanggal tidak tersedia"}
                </span>
              </p>
              <p className="text-sm text-gray-700 my-4">
                Waktu :{" "}
                <span className="font-semibold my-4">
                  {item?.item?.created_at
                    ? formatTime(item.item.created_at)
                    : "Tanggal tidak tersedia"}
                </span>
              </p>
              <div className="my-4">
                <label className="text-sm text-gray-700 mr-2 font-medium">
                  Status :
                </label>
                <div
                  className={`inline-block px-4 py-1 rounded-full text-white font-medium ${
                    status === "Dicari" ? "bg-red-500" : "bg-gray-500"
                  }`}
                >
                  {status}
                </div>
              </div>

              <p className="text-sm text-gray-700 my-4">
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
              {item?.item?.user_id !== user?.id &&
                (item?.item?.type === "found" ? (
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
                ))}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="ee-card ">
            <span className="title">Komentar</span>

            <ScrollArea
              className={`w-full text-black p-2 text-justify relative ${
                comments?.length > 0 ? "h-[450px]" : "h-[100px]"
              }`}
            >
              {comments?.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index}>
                    <div className="comments w-full flex gap-4 items-center justify-between">
                      <div className="comment-container w-full">
                        <div className="user">
                          <div className="user-pic w-10 h-10 relative flex items-center justify-center bg-gray-200 rounded-full">
                            <img
                              src={
                                comment?.user_id?.image_url ||
                                comment?.user_id?.name[0]
                              }
                              alt="user"
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div className="user-info">
                            <span className="text-black">
                              {comment?.user_id ? (
                                <>
                                  {comment?.user_id?.username}
                                  {comment?.updated_at !==
                                    comment?.created_at && (
                                    <span className="!text-gray-500 !text-base">
                                      {" "}
                                      (diedit)
                                    </span>
                                  )}
                                </>
                              ) : (
                                "Unknown User"
                              )}
                            </span>
                            <p>{formatDateTimeComment(comment?.created_at)}</p>
                          </div>
                        </div>
                        <p className="comment-content text-left">
                          {editCommentId === comment.id ? (
                            <div className="flex gap-4">
                              <textarea
                                className="w-full h-full p-2 border border-slate-400 rounded-sm bg-white comment-content text-left resize-none"
                                value={editCommentText}
                                onChange={(e) =>
                                  setEditCommentText(e.target.value)
                                }
                              />
                              <button
                                className="bg-blue-500 text-white"
                                onClick={handleUpdateComment}
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            comment.comment_text
                          )}
                        </p>
                      </div>
                      <div className="relative">
                        {user?.id === comment?.user_id?.id && (
                          <div>
                            <button
                              onClick={() => toggleDropdown(comment.id)}
                              className="p-2 bg-transparent  text-black rounded-md hover:bg-gray-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>

                            {openDropdownId === comment.id && (
                              <div
                                ref={(el) =>
                                  (dropdownRefs.current[comment.id] = el)
                                }
                                className="p-1 rounded-lg absolute flex flex-col gap-1 right-0 mt-2 w-24 md:w-48 bg-white border shadow-lg z-10"
                                style={{ top: "-2rem" }}
                              >
                                <button
                                  onClick={() => {
                                    setEditCommentId(comment.id);
                                    setEditCommentText(comment.comment_text);
                                    setOpenDropdownId(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 bg-blue-500 hover:text-black text-white hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteComment(comment.id);
                                    setOpenDropdownId(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 bg-red-500 hover:text-black text-white hover:bg-gray-100"
                                >
                                  Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              ) : (
                <div className="mt-8">
                  <p className="flex justify-center items-center">
                    Belum ada komentar
                  </p>
                </div>
              )}
            </ScrollArea>

            <div className="text-box rounded-b-xl bg-gray-200">
              <div className="box-container flex gap-4">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Tulis komentar disini"
                  className="bg-white comment-content text-left overflow-hidden resize-none"
                />
                <button
                  onClick={handleCreateComment}
                  className="send text-white bg-blue-500 rounded-full"
                  title="Send"
                  type="submit"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      stroke="#ffffff"
                      d="M12 5L12 20"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      stroke="#ffffff"
                      d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailItem;
