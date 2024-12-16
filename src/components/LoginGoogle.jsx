import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { setProfile } from "@/redux/authSlice";
import { profileAPI } from "@/utils/api/Auth/api";
import { useDispatch } from "react-redux";

export default function GoogleLoginHandler() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Hàm xử lý đăng nhập Google
  const handleGoogleLogin = async (response) => {
    if (!response.credential) {
      setError("Đăng nhập Google thất bại: Không có thông tin đăng nhập.");
      return;
    }

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

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        console.log("Login thành công:", data);
        handleLoginSuccess(data);
      } else {
        const errorData = await loginResponse.json();
        setError(errorData.message || "Đăng nhập Google thất bại");
      }
    } catch (error) {
      console.error("Error with Google login:", error);
      setError("Đăng nhập Google thất bại do lỗi mạng hoặc máy chủ.");
    }
  };

  // Xử lý logic khi đăng nhập thành công
  const handleLoginSuccess = async (data) => {
    try {
      Cookies.set("token", data.data.token, { expires: 7, path: "" });
      const profile = await profileAPI();
      if (profile && profile.length > 0) {
        const userdata = profile[0];
        dispatch(setProfile(userdata)); // Update Redux state with user data
      }
      router.push("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Cập nhật thông tin người dùng thất bại.");
    }
  };
  const [width, setWidth] = useState(window.innerWidth); // Track window width

  // Update the width whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set the width based on the window size
  const buttonWidth = width <= 640 ? 300 : 400; // 300px for mobile, 400px for PC

  return (
    <div className="">
      <GoogleLogin
        onSuccess={handleGoogleLogin} // Handle successful login
        onError={() => setError("Đăng nhập Google thất bại")} // Set error message on failure
        theme="dark" // Optional: Choose theme (dark, light)
        size="large" // Optional: Size of the button (small, medium, large)
        width={buttonWidth}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
