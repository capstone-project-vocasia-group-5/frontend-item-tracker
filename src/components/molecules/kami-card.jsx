import React from "react";
import styled from "styled-components";

const KamiCard = ({ name, role, photo, instagram, github, linkedin }) => {
  return (
    <StyledWrapper>
      <div className="kami-card rounded-md ">
        <div className="kami-card-info">
          <div className="kami-card-avatar">
            <img src={photo} className="photo" alt="" />
          </div>

          <div className="kami-card-title">{name}</div>
          <div className="kami-card-subtitle">{role}</div>
        </div>
        <ul className="kami-card-social">
          <li className="kami-card-social__item">
            <a href={github}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
              </svg>
            </a>
          </li>
          <li className="kami-card-social__item">
            <a href={instagram}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"
                ></path>
              </svg>
            </a>
          </li>
          <li className="kami-card-social__item">
            <a href={linkedin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .kami-card {
    width: 280px;
    height: 380px;
    background: radial-gradient(#515f65, #000000);
    padding: 2rem 1.5rem;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
  }

  .kami-card-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .photo {
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(
      -50%,
      -50%
    ); /* Geser gambar untuk benar-benar berada di tengah */
  }

  .kami-card-avatar {
    --size: 210px;
    width: var(--size);
    height: var(--size);
    position: relative;
    overflow: hidden; /* Memastikan gambar tidak melampaui kontainer */
    margin-bottom: 1rem;
    transition: transform 0.2s ease;
  }

  /*kami-Card footer*/
  .kami-card-social {
    transform: translateY(200%);
    display: flex;
    justify-content: space-around;
    width: 100%;
    opacity: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .kami-card-social__item {
    list-style: none;
  }

  .kami-card-social__item svg {
    display: block;
    height: 22px;
    width: 22px;
    fill: #ffffff;
    cursor: pointer;
    transition: fill 0.2s ease, transform 0.2s ease;
  }

  /*Text*/
  .kami-card-title {
    color: #fffff8;
    font-size: 1.5em;
    font-weight: 600;
    line-height: 2rem;
  }

  .kami-card-subtitle {
    color: #859ba8;
    font-size: 0.8em;
  }

  /*Hover*/
  .kami-card:hover {
    box-shadow: 0 8px 50px #23232333;
  }

  .kami-card:hover .kami-card-info {
    transform: translateY(-5%);
  }

  .kami-card:hover .kami-card-social {
    transform: translateY(100%);
    opacity: 1;
  }

  .kami-card-social__item svg:hover {
    fill: #232323;
    transform: scale(1.1);
  }

  .kami-card-avatar:hover {
    transform: scale(1.1);
  }
`;

export default KamiCard;
