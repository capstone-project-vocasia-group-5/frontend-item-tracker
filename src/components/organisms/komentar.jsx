import styled from "styled-components";
import { formatDateTimeComment } from "../../utils/time-formatter";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "../../context/auth-context";
import { useState } from "react";

const Komentar = ({ comments, item }) => {
  const { user } = useAuth();

  const [showOptions, setShowOptions] = useState(false);

  const handleEdit = () => {
    // Fungsi untuk mengedit komentar (misalnya membuka form edit)
    setShowOptions(false); // Menutup pilihan setelah klik
  };

  const handleDelete = () => {
    // Fungsi untuk menghapus komentar
    setShowOptions(false); // Menutup pilihan setelah klik
  };

  return (
    <StyledWrapper>
      <div className="ee-card ">
        <span className="title">Komentar</span>

        <ScrollArea
          className={`w-full text-black p-2 text-justify relative ${
            comments?.length > 0 ? "h-[450px]" : "h-[100px]"
          }`}
        >
          {comments?.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comments ">
                <div className="comment-react">
                  <button
                    className={
                      user?.id === comment?.user_id?.id ? "" : "!hidden"
                    }
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    ✏️
                  </button>

                  {showOptions && (
                    <div className="absolute bg-white shadow-lg rounded-md p-4 mt-2 w-48 border">
                      <button
                        onClick={handleEdit}
                        className="w-full py-2 px-4 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="comment-container">
                  <div className="user">
                    <div className="user-pic">
                      <img
                        src={
                          comment?.user_id?.image_url ||
                          comment?.user_id?.name[0]
                        }
                        alt="user"
                      />
                    </div>
                    <div className="user-info">
                      {item?.user_id === comment.user_id.id &&
                      item?.type === "lost" ? (
                        <span className="text-black">
                          {comment.user_id.name}{" "}
                        </span>
                      ) : item?.user_id === comment.user_id.id &&
                        item?.type === "found" ? (
                        <span className="!text-green-500">Penemu</span>
                      ) : (
                        <span className="text-black">
                          {comment.user_id.name}
                        </span>
                      )}
                      <p>{formatDateTimeComment(comment?.created_at)}</p>
                    </div>
                  </div>
                  <p className="comment-content text-left">
                    {comment?.comment_text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada komentar</p>
          )}
        </ScrollArea>

        <div className="text-box rounded-b-xl bg-gray-200">
          <div className="box-container flex gap-4">
            <textarea
              placeholder="Tulis komentar disini"
              className="bg-white comment-content text-left overflow-hidden resize-none"
            />
            <button
              type="submit"
              className="send text-white rounded-full 
              "
              title="Send"
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ee-card {
    width: f100%;
    height: fit-content;
    background-color: white;
    border-radius: 27px;
  }

  .title {
    width: 100%;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #f1f1f1;
    font-weight: 700;
    font-size: 1rem;
    color: #47484b;
  }

  .title::after {
    content: "";
    width: 8ch;
    height: 1px;
    position: absolute;
    bottom: -1px;
    background-color: #47484b;
  }

  .comments {
    display: grid;
    grid-template-columns: 35px 1fr;
    gap: 20px;
    padding: 20px;
  }

  .comment-react {
    width: 35px;
    height: fit-content;
    display: grid;
    grid-template-columns: auto;
    margin: 0;
    background-color: #f1f1f1;
    border-radius: 5px;
  }

  .comment-react button {
    width: 35px;
    height: 35px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    outline: none;
  }

  .comment-react button:after {
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    left: -2.5px;
    top: -2.5px;
    background-color: #f5356e;
    border-radius: 50%;
    z-index: 0;
    transform: scale(0);
  }

  .comment-react button svg {
    position: relative;
    z-index: 9;
  }

  .comment-react button:hover:after {
    animation: ripple 0.6s ease-in-out forwards;
  }

  .comment-react button:hover svg {
    fill: #f5356e;
  }

  .comment-react button:hover svg path {
    stroke: #f5356e;
    fill: #f5356e;
  }

  .comment-react hr {
    width: 80%;
    height: 1px;
    background-color: #dfe1e6;
    margin: auto;
    border: 0;
  }

  .comment-react span {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    font-size: 13px;
    font-weight: 600;
    color: #707277;
  }

  .comment-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0;
    margin: 0;
  }

  .comment-container .user {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 10px;
  }

  .comment-container .user .user-pic {
    width: 40px;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f1;
    border-radius: 50%;
  }

  .comment-container .user .user-pic:after {
    content: "";
    width: 9px;
    height: 9px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    border-radius: 50%;
    background-color: #0fc45a;
    border: 2px solid #ffffff;
  }

  .comment-container .user .user-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3px;
  }

  .comment-container .user .user-info span {
    font-weight: 700;
    font-size: 18px;
    color: black;
  }

  .comment-container .user .user-info p {
    font-weight: 600;
    font-size: 14px;
    color: #acaeb4;
  }

  .comment-container .comment-content {
    font-size: 1rem;
    line-height: 16px;
    // font-weight: 600;
    color: black;
  }

  .text-box {
    width: 100%;
    height: fit-content;
    padding: 8px;
    color: #000000;
  }

  .text-box .box-container {
    border-radius: 21px;
    padding: 8px;
  }

  .text-box textarea {
    width: 100%;
    height: 40px;
    resize: none;
    border: 0;
    border-radius: 6px;
    padding: 12px 12px 10px 12px;
    font-size: 13px;
    outline: none;
    caret-color: #000000;
  }

  .text-box .formatting {
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr;
  }

  .text-box .formatting button {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 0;
    outline: none;
  }

  .text-box .formatting button:hover {
    background-color: #f1f1f1;
  }

  .text-box .formatting .send {
    width: 100px;
    height: 40px;
    background-color: #0a84ff;
    margin: 0 0 0 auto;
  }

  .text-box .formatting .send:hover {
    background-color: #026eda;
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0.6;
    }

    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export default Komentar;
