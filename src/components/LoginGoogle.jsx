import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { setProfile } from "@/redux/authSlice";
import { profileAPI } from "@/utils/api/Auth/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import { Spinner } from "./ui/loading";

export default function GoogleLoginHandler() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async (response) => {
    if (!response.credential) {
      toast.error("Đăng nhập Google thất bại: Không có thông tin đăng nhập.");
      return;
    }

    setLoading(true); // Hiển thị loading khi bắt đầu xử lý

    try {
      const loginResponse = await fetch(
        "http://localhost:8000/api/google/loginWithGoogle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        },
      );

      const data = await loginResponse.json();

      if (loginResponse.ok) {
        if (data.isNewUser) {
          toast.success("Tài khoản đã được tạo thành công!");
        } else {
          toast.success("Đăng nhập thành công!");
        }
        await handleLoginSuccess(data);
      } else {
        toast.error(data.message || "Đăng nhập Google thất bại.");
      }
    } catch (error) {
      toast.error("Đăng nhập Google thất bại do lỗi mạng hoặc máy chủ.");
      console.error("Error with Google login:", error);
    } finally {
      setLoading(false); // Tắt loading khi xử lý xong
    }
  };

  const handleLoginSuccess = async (data) => {
    try {
      Cookies.set("token", data.data.token, { expires: 7, path: "" });
      const profile = await profileAPI();
      if (profile && profile.length > 0) {
        const userdata = profile[0];
        dispatch(setProfile(userdata)); // Cập nhật Redux với thông tin người dùng
      }
      router.push("/"); // Chuyển hướng người dùng về trang chủ
    } catch (error) {
      toast.error("Cập nhật thông tin người dùng thất bại.");
      console.error("Error updating profile:", error);
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buttonWidth = width <= 640 ? 300 : 400;

  return (
    <div>
      {loading ? (
        <Spinner /> // Hiển thị spinner khi đang loading
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Đăng nhập Google thất bại.")}
          theme="dark"
          size="large"
          width={buttonWidth}
        />
      )}
    </div>

  );
}
