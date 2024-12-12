import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

export default function GoogleLoginHandler() {
  const router = useRouter();
  const [error, setError] = useState(null);

  // Hàm xử lý đăng nhập Google
  const handleGoogleLogin = async (response) => {
    if (!response.credential) {
      setError("Đăng nhập Google thất bại: Không có thông tin đăng nhập.");
      return;
    }

    try {
      // Gửi token Google đến backend
      const backendResponse = await fetch(
        "http://localhost:8000/api/google/registerWithGoogle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        },
      );

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        console.log(data);
        Cookies.set("token", data.data.token, { expires: 7, path: "" });
        router.push("/");
      } else {
        const errorData = await backendResponse.json();
        setError(errorData.message || "Đăng nhập Google thất bại");
      }
    } catch (error) {
      console.error("Error with Google login:", error);
      setError("Đăng nhập Google thất bại do lỗi mạng hoặc máy chủ.");
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLogin} // Xử lý khi đăng nhập thành công
        onError={() => setError("Đăng nhập Google thất bại")} // Xử lý khi có lỗi
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
