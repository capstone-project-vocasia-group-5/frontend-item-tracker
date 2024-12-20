import { useNavigate, useLocation } from "react-router-dom";

export default function ReportButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate("/report");
  };

  const getText = () => {
    switch (location.pathname) {
      case "/lost":
        return "Upload barang hilang anda!";
      case "/found":
        return "Laporkan barang penemuan anda!";
      default:
        return "Laporkan penemuan atau barang hilang anda!";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 m-4 bg-gray-200 rounded-md shadow-md">
      <p className="font-bold text-black">{getText()}</p>

      <button
        onClick={handleNavigate}
        className="flex items-center justify-center  bg-black text-white rounded-md hover:bg-blue-600 "
        aria-label="Tambah laporan"
      >
        +
      </button>
    </div>
  );
}
