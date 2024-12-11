import React from "react";
import styled from "styled-components";

const SliderOther = ({ index, slide }) => {
  return (
    <StyledWrapper>
      <div className="e-card text-left">
        <p className="small-desc my-5">Step {index + 1} </p>
        <h3 className="e-card-title text-4xl font-semibold ">{slide.title}</h3>
        <p className="small-desc text-sm  mt-2">{slide.content}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .e-card-title {
    line-height: normal;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  .small-desc {
    line-height: 1.5em;
    color: #452c2c;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2em;
    height: 2em;
    overflow: hidden;
    top: 0;
    right: 0;
    background: #000000;
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .e-card {
    position: relative;
    background-color: #f2f8f9;
    border-radius: 10px;
    padding: 2em 1.2em;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    background: #ffffff;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    min-height: 290px;
  }

  .e-card:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #000000;
    height: 40px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.35s ease-out;
  }

  .e-card:hover:before {
    transform: scale(28);
  }

  .e-card:hover .small-desc {
    transition: all 0.5s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }

  .e-card:hover .e-card-title {
    transition: all 0.5s ease-out;
    color: #ffffff;
  }
`;

export default SliderOther;
