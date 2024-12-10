export default function BackButton({ handleClickBack }) {
  return (
    <button
      onClick={handleClickBack}
      type="button"
      className="!border-white mb-6 md:mb-0 bg-white flex items-center justify-center text-center w-36 rounded-2xl h-12 relative text-black text-lg font-semibold !border-4 group"
    >
      <div className="bg-black rounded-xl h-10 w-1/3 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          />
          <path
            fill="#ffffff"
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          />
        </svg>
      </div>
      <p className="translate-x-3 ml-5">Kembali</p>
    </button>
  );
}
