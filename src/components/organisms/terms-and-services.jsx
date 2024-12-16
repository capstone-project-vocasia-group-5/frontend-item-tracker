import React from 'react';
import styled from 'styled-components';

const TermsAndServicesCard = () => {
  return (
    <StyledWrapper>
      <div className="modal">
        <article className="modal-container">
          <header className="modal-container-header">
            <div className="modal-container-title">
              <svg aria-hidden="true" height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z" fill="currentColor" />
              </svg>
              <span className='justify-center md:ml-5'>Syarat & Ketentuan</span>
            </div>
          </header>
          <section className="modal-container-body rtf">
            <p>
              Dengan menggunakan aplikasi ini, Anda menyetujui Syarat dan
              Ketentuan berikut. Harap baca dengan saksama sebelum melanjutkan
              penggunaan layanan kami.
              <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Definisi</h5>
            <p>
              1. <b>Barang Hilang:</b> Barang yang dilaporkan oleh pengguna
              sebagai hilang.
            </p>
            <p>
              2. {""}
              <b>Barang Temuan:</b> Barang yang dilaporkan oleh pengguna sebagai
              barang yang ditemukan.
            </p>
            <p>
              {" "}
              3. {""}
              <b>Pengguna:</b> Setiap orang yang mengakses dan menggunakan
              aplikasi Item Tracker. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Kewajiban Pengguna</h5>
            <p>
              Pengguna wajib memberikan informasi yang benar dan akurat tentang
              barang hilang atau temuan.
            </p>
            <p>
              Pengguna dilarang mengunggah konten yang bersifat palsu, melanggar
              hukum, atau menyinggung pihak lain.
            </p>
            <p>
              Pengguna bertanggung jawab atas aktivitas mereka di dalam
              aplikasi. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">
              Hak Akses dan Penggunaan Aplikasi
            </h5>
            <p>
              Aplikasi ini hanya boleh digunakan untuk mencari barang hilang
              atau melaporkan barang temuan.
            </p>
            <p>
              Item Tracker berhak menangguhkan atau menghentikan akses pengguna
              yang melanggar aturan.
              <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Batasan Tanggung Jawab</h5>
            <p>
              Item Tracker hanya menyediakan platform untuk menghubungkan
              pemilik barang dan penemu. Kami tidak bertanggung jawab atas klaim
              kepemilikan yang salah atau kesalahpahaman antara pengguna. <br />{" "}
              <br />
            </p>

            <h5 className="text-xl font-bold">Pembaruan dan Perubahan</h5>
            <p>
              Kami berhak memperbarui fitur, layanan, dan Syarat dan Ketentuan
              ini tanpa pemberitahuan sebelumnya. Pengguna diharapkan memeriksa
              pembaruan secara berkala. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Hukum yang Berlaku</h5>
            <p>
              Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di
              Indonesia. <br /> <br />
            </p>

            <h5 className="text-xl font-bold">Kontak</h5>
            <p>
              Jika ada pertanyaan atau keluhan, silakan hubungi kami di{" "}
              <a href="mailto:itemtrackerteam@gmail.com">
                itemtrackerteam@gmail.com
              </a>
              . <br />
            </p>
          </section>
          <footer className="modal-container-footer">
            {/* <button className="button is-primary">Decline</button>
            <button className="button is-primary">Accept</button> */}
          </footer>
        </article>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button,
  .input,
  .select,
  .textarea {
    font: inherit;
  }

  a {
    color: inherit;
  }

  .modal-container {
    max-height: 400px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 600px) {
    .modal-container {
      width: 90%;
    }
  }

  .modal-container-header {
    padding: 16px 32px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black; 
    font-size: 16px;
  }

  .modal-container-title {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1;
    font-weight: 700;
    font-size: 1.125;
  }

  .modal-container-title svg {
    width: 32px;
    height: 32px;
    color:rgb(0, 0, 0);
  }

  .modal-container-body {
    padding: 24px 32px 51px;
    overflow-y: auto;
    color: black; 
    font-size: 16px;
  }

  .rtf h1,
  .rtf h2,
  .rtf h3,
  .rtf h4,
  .rtf h5,
  .rtf h6 {
    font-weight: 700;
  }

  .rtf h1 {
    font-size: 1.5rem;
    line-height: 1.125;
  }

  .rtf h2 {
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .rtf h3 {
    font-size: 1rem;
    line-height: 1.5;
  }

  .rtf > * + * {
    margin-top: 1em;
  }

  .rtf > * + :is(h1, h2, h3) {
    margin-top: 2em;
  }

  .rtf > :is(h1, h2, h3) + * {
    margin-top: 0.75em;
  }

  .rtf ul,
  .rtf ol {
    margin-left: 20px;
    list-style-position: inside;
  }

  .rtf ol {
    list-style: numeric;
  }

  .rtf ul {
    list-style: disc;
  }

  .modal-container-footer {
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #ddd;
    gap: 12px;
    position: relative;
  }

  .modal-container-footer:after {
    content: "";
    display: block;
    position: absolute;
    top: -51px;
    left: 24px;
    right: 24px;
    height: 50px;
    flex-shrink: 0;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0.75), transparent);
    pointer-events: none;
  }

  .button {
    padding: 12px 20px;
    border-radius: 8px;
    background-color: transparent;
    border: 0;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s ease;
  }

  .button.is-ghost:hover, .button.is-ghost:focus {
    background-color: #dfdad7;
  }

  .button.is-primary {
    background-color: #750550;
    color: #fff;
  }

  .button.is-primary:hover, .button.is-primary:focus {
    background-color: #4a0433;
  }

  .icon-button {
    padding: 0;
    border: 0;
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.15s ease;
  }

  .icon-button svg {
    width: 24px;
    height: 24px;
  }

  .icon-button:hover, .icon-button:focus {
    background-color: #dfdad7;
  }`;

export default TermsAndServicesCard;
