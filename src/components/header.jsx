"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Bell, DoorOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { profileAPI } from "@/utils/api/Auth/api";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfile } from "@/redux/authSlice";

export function HeaderComponent() {
  const [notificationCount, setNotificationCount] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get user from Redux store
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const handleLoginToggle = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    handleLoginToggle();
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const profile = await profileAPI();
          if (profile && profile.length > 0) {
            const userdata = profile[0];
            dispatch(setProfile(userdata)); // Update Redux state with user data
            console.log(userdata); // Log the user data to check
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch]); // Adding dispatch in dependency array

  const NavItems = () => (
    <>
      <Link href="/filter" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition">
        Nhà Trọ
      </Link>
      <Link href="/blog" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition">
        Nhật Ký Trọ
      </Link>
      <Link href="/about" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition">
        Giới Thiệu
      </Link>
      <Link href="/contact" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition">
        Liên Hệ
      </Link>
      <Link href="/support" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition">
        Hỗ trợ
      </Link>
    </>
  );

  return (
    <header className="bg-background border-b fixed w-full top-0 z-40 px-4">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <img className="h-12 w-auto object-cover mr-8" src="/favicon.ico" alt="Logo" />
          </Link>
          <div className="hidden md:flex gap-8">
            <NavItems />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="relative p-3">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1rem] h-5">
                    {notificationCount}
                  </Badge>
                )}
                <span className="sr-only">Thông báo</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notificationCount > 0 ? (
                <>
                  <DropdownMenuItem>
                    <div className="flex items-start space-x-2">
                      <Bell className="h-5 w-5 mt-0.5 text-blue-500" />
                      <div>
                        <p className="font-medium">Bạn có {notificationCount} thông báo mới</p>
                        <p className="text-sm text-gray-500">Nhấp để xem chi tiết</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={clearNotifications}>
                    <Button variant="ghost" className="w-full justify-start">Xóa tất cả</Button>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>Không có thông báo mới</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-0">
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage alt={user?.name || "User"} src={`http://localhost:8000/storage/${user?.avatar}`} />
                      <AvatarFallback>{user?.name.charAt(0) || "User"}</AvatarFallback>
                    </Avatar>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full" align="end" forceMount>
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt={user?.name || "User"} src={`http://localhost:8000/storage/${user?.avatar}`} />
                    <AvatarFallback>{user?.name.charAt(0) || "User"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "Email"}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link className="w-full" href="/profile">Hồ sơ</Link></DropdownMenuItem>
                <DropdownMenuItem><Link className="w-full" href="/profile/history">Lịch sử</Link></DropdownMenuItem>
                <DropdownMenuItem><Link className="w-full" href="/profile/edit">Cài đặt</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLoginToggle} variant="orange" size="lg">
              <DoorOpen className="mr-2 h-4 w-4" />
              Đăng nhập
            </Button>
          )}
        </nav>

        {/* Mobile Header */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <NavItems />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="relative p-3 w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Thông báo
                    {notificationCount > 0 && (
                      <Badge variant="destructive" className="ml-2 px-1 min-w-[1rem] h-5">
                        {notificationCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notificationCount > 0 ? (
                    <>
                      <DropdownMenuItem>
                        <div className="flex items-start space-x-2">
                          <Bell className="h-5 w-5 mt-0.5 text-blue-500" />
                          <div>
                            <p className="font-medium">Bạn có {notificationCount} thông báo mới</p>
                            <p className="text-sm text-gray-500">Nhấp để xem chi tiết</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={clearNotifications}>
                        <Button variant="ghost" className="w-full justify-start">Xóa tất cả</Button>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>Không có thông báo mới</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {user ? (
                <>
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage alt={user?.name || "User"} src={`http://localhost:8000/storage/${user?.avatar}`} />
                      <AvatarFallback>{user?.name.charAt(0) || "User"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || "Email"}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="justify-start" onClick={() => router.push("/profile")}>
                    Hồ sơ
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => router.push("/profile/edit")}>
                    Cài đặt
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button onClick={handleLoginToggle} variant="orange" size="lg" className="w-full">
                  <DoorOpen className="mr-2 h-4 w-4" />
                  Đăng nhập
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}