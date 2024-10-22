"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, GithubIcon, FacebookIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from 'axios'; // Import axios

export function AuthFormComponent() {




  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error handling
  const [loading, setLoading] = useState(false); // For loading state

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      const { token, message, user } = response.data;
      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Hiển thị thông báo từ backend
      alert(message);

      // Xóa lỗi (nếu có) và điều hướng người dùng sau khi đăng nhập thành công
      setError('');
      window.location.href = '/'; // Điều hướng đến trang chủ
    } catch (err) {
      // Hiển thị thông báo lỗi từ backend nếu có
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const ImageSection = () => (
    <div className="w-full md:aspect-auto aspect-[21/9] overflow-hidden md:w-1/2 bg-gray-100">
      <img
        src="/dark-blue-house-exterior-2.png"
        alt="hình ảnh mô tả"
        className="w-full h-full object-cover"
      />
    </div>
  );

  const FormSection = () => (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0">
        <CardHeader>
          <CardTitle>{isLogin ? "Đăng nhập" : "Đăng ký"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Nhập tài khoản bên dưới nhanh và tiện lợi."
              : "Sử dụng các trường thông tin cơ bản."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="minhtuong@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="text"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            variant="blue"
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
          </Button>
          <Button variant="link" onClick={toggleForm} className="w-full">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản rồi?"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full">
              <GithubIcon className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row container mx-auto">
      {isLogin ? (
        <>
          <ImageSection />
          <FormSection />
        </>
      ) : (
        <>
          <FormSection />
          <ImageSection />
        </>
      )}
    </div>
  );
}
