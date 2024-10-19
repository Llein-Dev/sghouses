"use client";

import { useState } from "react";
import Image from "next/image";
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

export function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    // You can now use router.push or router.replace for navigation
    router.push("/login"); // Example navigation
  };

  const NavItems = () => (
    <>
      <Link href="#" className="text-foreground hover:text-primary transition-colors">
        Trang chủ
      </Link>
      <Link href="#" className="text-foreground hover:text-primary transition-colors">
        Giới thiệu
      </Link>
      <Link href="#" className="text-foreground hover:text-primary transition-colors">
        Liên hệ
      </Link>
    </>
  );

  return (
    (<header className="bg-background border-b fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img
              className="h-12 w-auto object-cover"
              src="/favicon.ico"
              alt="Logo"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <NavItems />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="relative p-3">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 px-1 min-w-[1rem] h-5">
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
                        <p className="font-medium">
                          Bạn có {notificationCount} thông báo mới
                        </p>
                        <p className="text-sm text-gray-500">
                          Nhấp để xem chi tiết
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={clearNotifications}>
                    <Button variant="ghost" className="w-full justify-start">
                      Xóa tất cả
                    </Button>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>Không có thông báo mới</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Hữu Đạt" />
                    <AvatarFallback>HĐ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" align="end" forceMount>
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Hữu Đạt" />
                    <AvatarFallback>HĐ</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Hữu Đạt</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      vohuudat282224@gmail.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLoginToggle}>
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
                <DropdownMenuContent align="end" className="w-[250px]">
                  <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notificationCount > 0 ? (
                    <>
                      <DropdownMenuItem>
                        <div className="flex items-start space-x-2">
                          <Bell className="h-5 w-5 mt-0.5 text-blue-500" />
                          <div>
                            <p className="font-medium">
                              Bạn có {notificationCount} thông báo mới
                            </p>
                            <p className="text-sm text-gray-500">
                              Nhấp để xem chi tiết
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={clearNotifications}>
                        <Button variant="ghost" className="w-full justify-start">
                          Xóa tất cả
                        </Button>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>Không có thông báo mới</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Hữu Đạt" />
                      <AvatarFallback>HĐ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Hữu Đạt</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        vohuudat282224@gmail.com
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="justify-start" onClick={() => { }}>
                    Hồ sơ
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => { }}>
                    Cài đặt
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={handleLoginToggle}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLoginToggle}
                  variant="orange"
                  size="lg"
                  className="w-full">
                  <DoorOpen className="mr-2 h-4 w-4" />
                  Đăng nhập
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>)
  );
}