import { useEffect } from "react";
import Cookies from "js-cookie"; // Cài đặt thư viện này để xử lý cookie: npm install js-cookie
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify"; // Nhập toast
import "react-toastify/dist/ReactToastify.css"; // Nhập CSS cho thông báo toast

const FavoriteButton = ({ idRoom, active, setActive }) => {
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = Cookies.get("token"); // Lấy token từ cookies
        const response = await fetch(
          `https://hieu.name.vn/datn/public/api/yeu-thich/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Đưa token vào header Authorization
            },
          }
        );
        const data = await response.json();
        setActive(data.isFavorite); // Đặt trạng thái từ cha
      } catch (error) {
        console.error("Lỗi khi lấy trạng thái yêu thích:", error);
      }
    };

    fetchStatus();
  }, [idRoom, setActive]); // Bao gồm setActive như một phụ thuộc

  const handleFavorite = async (idRoom) => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookies
      const response = await fetch(`https://hieu.name.vn/datn/public/api/yeu-thich/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Đưa token vào header Authorization
        },
        body: JSON.stringify({ id_room: idRoom }),
      });

      if (response.ok) {
        setActive((prev) => !prev); // Chuyển đổi trạng thái active từ cha
        toast.success(active ? "Đã xóa khỏi danh sách yêu thích!" : "Đã thêm vào danh sách yêu thích!"); // Hiển thị thông báo thành công
      } else {
        console.error("Không thể cập nhật trạng thái yêu thích");
        toast.error("Không thể cập nhật trạng thái yêu thích."); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái yêu thích."); // Hiển thị thông báo lỗi
    }
  };

  return (
    <>
      <Button
        onClick={() => handleFavorite(idRoom)}
        variant="outline"
        size="icon"
        className={`rounded-full ${active ? "bg-red-500 text-white" : ""}`}
      >
        <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
        <span className="sr-only">
          {active ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"}
        </span>
      </Button>
    </>
  );
};



export default FavoriteButton;
