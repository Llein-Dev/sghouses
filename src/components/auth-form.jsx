import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLoginHandler from "./LoginGoogle";

export function AuthForm({
  isLogin,
  formData,
  error,
  loading,
  toggleForm,
  handleChange,
  handleSubmit,
  handleToForgot,
}) {
  return (
    <div className="flex bg-white container mx-auto h-[80vh]">
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-200">
        <img
          src="/dark-blue-house-exterior-2.png"
          alt="Auth illustration"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="md:flex-1 md:flex block w-full items-center justify-center p-4">
        <div className="w-full max-w-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Login" : "Sign Up"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="">
              {!isLogin && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    className="w-full md:w-[398px]"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="space-y-2 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  className="w-full md:w-[398px]"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="w-full md:w-[398px]"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <p className="mt-6 mb-2 opacity-50 text-xs text-center">By signing up, you agree to our Terms & Privacy Policy .</p>
            
              <Button
                type="submit"
                variant="blue"
                className="w-full md:w-[398px]" // Corrected the max-width syntax
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </Button>
              <p className="text-center my-2">or</p>
              <GoogleLoginHandler />
              <Button
                variant="link"
                type="button"
                className="text-gray-500 w-full mt-4"
                onClick={toggleForm}
              >
                {isLogin
                  ? "Chưa có tài khoản hả? Đăng ký"
                  : "Có tài khoản rồi? Đăng nhập"}
              </Button>
              <Button
                variant="link"
                type="button"
                className="text-gray-500 w-full p-1"
                onClick={handleToForgot}
              >
                Quên mật khẩu?
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
