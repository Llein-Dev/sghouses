
"use client";

import { AuthForm } from "@/components/auth-form";
import Breadcrumb from "@/components/breadcum";
import { useState } from "react";
import { loginAPI, signupAPI } from "@/utils/api/Auth/api";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset lại lỗi trước khi gửi request

    try {
      let response;
      if (isLogin) {
        response = await loginAPI(formData.email, formData.password);
        console.log("Login response:", response);
        router.push('/');
      } else {
        response = await signupAPI(formData.name, formData.email, formData.password);
        console.log("Signup response:", response);
        toggleForm();
 
      }
   
    } catch (err) {
      setError(err.message || ' Email này chưa được đăng ký');
    } finally {
      setLoading(false);  // Tắt loading sau khi hoàn thành
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
        />
      </div>
    </>
  )
}