import React from "react";
import styled from "styled-components";

const ButtonBulet = ({ isOnClick }) => {
  return (
    <StyledWrapper>
      <button className="Btn " onClick={isOnClick}>
        <div className="sign ">
          <svg viewBox="0 0 512 512">
            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
          </svg>
        </div>
        <div className="text">Login</div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 55px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #000000;
  }

  /* plus sign */
  .sign {
    width: 50px;
    transition-duration: 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1em;
    font-weight: 600;
    transition-duration: 0.3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 120px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: 0.3s;
    padding-left: 10px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px, 2px);
  }
`;

export default ButtonBulet;
