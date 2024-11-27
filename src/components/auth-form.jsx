import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          alt="Hình minh họa xác thực"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và Tên</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                variant="link"
                type="button"
                className="text-gray-500 w-full"
                onClick={toggleForm}
              >
                {isLogin
                  ? "Chưa có tài khoản? Đăng ký"
                  : "Đã có tài khoản? Đăng nhập"}
              </Button>
              <Button
                type="submit"
                variant="blue"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Đang đăng nhập..."
                    : "Đang đăng ký..."
                  : isLogin
                  ? "Đăng nhập"
                  : "Đăng ký"}
              </Button>
              <Button
                variant="link"
                type="button"
                className="text-gray-500 w-full"
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
