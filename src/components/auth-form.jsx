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
import {
  EyeIcon,
  EyeOffIcon,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AuthFormComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

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
    <div className="w-full bg-white md:w-1/2 flex items-center justify-center p-8">
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
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Miêu Hính" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="minhtuong@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
              />
              <Button
                type="button"
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
          <Button variant="link" onClick={toggleForm} className="w-full">
            {isLogin
              ? "Chưa có tài khoản?"
              : "Đã có tài khoản rồi?"}
          </Button>
          <Button variant="blue" className="w-full">{isLogin ? "Đăng nhập" : "Đăng ký"}</Button>
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
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row container mx-auto ">
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
