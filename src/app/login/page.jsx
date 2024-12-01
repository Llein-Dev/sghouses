// LoginPage.js
"use client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { AuthForm } from "@/components/auth-form";
import Breadcrumb from "@/components/breadcum";
import { useState } from "react";
import { loginAPI, profileAPI, signupAPI } from "@/utils/api/Auth/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setProfile } from "@/redux/authSlice";


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
    setError(null);
  };

  const handleToForgot = () => {
    router.push("login/forgot-password");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (isLogin) {
        response = await loginAPI(formData.email, formData.password);
        toast.success("đăng nhập thành công!");
        router.push("/");
        if (response) {
          try {
            const profile = await profileAPI();
            if (profile && profile.length > 0) {
              const userdata = profile[0];
              dispatch(setProfile(userdata)); // Update Redux state with user data
            
            }
          } catch (error) {
            console.error("Failed to fetch user profile:", error);
          }
        }
      } else {
        response = await signupAPI(formData.name, formData.email, formData.password);
        toast.success("đăng nhập thành công!");
        toggleForm();
      }
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container mx-auto px-4 space-y-4 pt-4">
      <Breadcrumb />
      <AuthForm
        isLogin={isLogin}
        formData={formData}
        error={error}
        loading={loading}
        toggleForm={toggleForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleToForgot={handleToForgot}
      />
    </div>

       </>
  );
}
