import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { Button } from "../components/ui/button.jsx";

const DetailItem = () => {
  return (
    <div>
      <Navbar />
      {/* Fitur Utama */}

      <div className="flex flex-wrap">
        <div className="w-[100%] sm:w-[50%] p-5 m-4">
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                alt=""
              />
            </div>
            <div class="grid grid-cols-5 gap-4">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-left p-5 m-4 rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-900 my-4">Meong</h2>
          <p className="text-sm text-gray-700 my-2">
            Terakhir Terlihat: 23 Juni 2024
          </p>
          <p className="text-sm text-gray-700 my-2">Status: Masih Dicari</p>
          <p className="text-sm text-gray-700 my-2">
            Deskripsi: Kucing Hitam kalau ngomong bilang meong
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M33.2978 31.5C34.0106 31.3496 34.6967 31.0931 35.3333 30.7391M25.152 30.2369C26.2956 30.7352 27.3926 31.1058 28.4429 31.3486M17.8054 25.6503C18.597 26.2062 19.4442 26.8732 20.2683 27.4482M2.75 23.4998C3.36717 23.1989 4.03417 22.852 4.78742 22.5549M9.3625 21.9167C10.4397 22.0355 11.6472 22.3441 13.0157 22.9191M31.5 11.375C31.5 10.6125 31.1971 9.88123 30.6579 9.34207C30.1188 8.8029 29.3875 8.5 28.625 8.5C27.8625 8.5 27.1312 8.8029 26.5921 9.34207C26.0529 9.88123 25.75 10.6125 25.75 11.375C25.75 12.1375 26.0529 12.8688 26.5921 13.4079C27.1312 13.9471 27.8625 14.25 28.625 14.25C29.3875 14.25 30.1188 13.9471 30.6579 13.4079C31.1971 12.8688 31.5 12.1375 31.5 11.375Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.5181 23.105C30.0002 23.5762 29.3245 23.836 28.6244 23.8334C27.9243 23.836 27.2486 23.5762 26.7307 23.105C22.079 18.804 15.846 13.997 18.8858 7.02037C20.5303 3.24646 24.4748 0.833374 28.6244 0.833374C32.774 0.833374 36.7185 3.24837 38.3611 7.02037C41.399 13.9894 35.1794 18.8175 30.5181 23.105Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailItem;
