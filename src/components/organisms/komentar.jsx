import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Komentar = () => {
  return (
    <StyledWrapper>
      <div className="ee-card ">
        <span className="title">Comments</span>
        <div class="comments ">
          <div class="comment-react">
            <button>✏️</button>
            <hr />
            <button>🗑️</button>
          </div>
          <div class="comment-container">
            <div class="user">
              <div class="user-pic">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linejoin="round"
                    fill="#707277"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#707277"
                    d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                  ></path>
                  <path
                    stroke-width="2"
                    fill="#707277"
                    stroke="#707277"
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                  ></path>
                </svg>
              </div>
              <div class="user-info">
                <span>Yassine Zanina</span>
                <p>Wednesday, March 13th at 2:45pm</p>
              </div>
            </div>
            <p class="comment-content text-left">
              I've been using this product for a few days now and I'm really
              impressed! The interface is intuitive and easy to use, and the
              features are exactly what I need to streamline my workflow.
            </p>
          </div>
        </div>

        <div className="text-box rounded-b-xl bg-gray-200">
          <div className="box-container flex gap-4">
            <textarea
              placeholder="Reply"
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
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  stroke="#ffffff"
                  d="M12 5L12 20"
                ></path>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
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
    font-size: 13px;
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
    font-size: 12px;
    color: #47484b;
  }

  .comment-container .user .user-info p {
    font-weight: 600;
    font-size: 10px;
    color: #acaeb4;
  }

  .comment-container .comment-content {
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: #5f6064;
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
