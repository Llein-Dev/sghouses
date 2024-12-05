"use client";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // Make sure to import jwtDecode
import Link from "next/link";
import { ToastContainer } from "react-toastify";

import {
  LayoutDashboard,
  Users,
  PhoneCall,
  FileText,
  Bed,
  Building,
  Settings,
  Bell,
  ChevronDown,
  Image,
  DoorOpen,
  Map,
  Minimize,
  Newspaper,
  Home,
  Receipt,
  MessageCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { profileAPI } from "@/utils/api/Auth/api";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    href: "/admin",
    label: "Bảng điều khiển", // Dashboard
    icon: <LayoutDashboard className="p-1 bg-blue-900 rounded text-white" />,
    key: "dashboard",
  },
  {
    href: "/admin/users",
    label: "Người dùng", // Users
    icon: <Users className="p-1 bg-blue-900 rounded text-white" />,
    key: "users",
  },
  {
    href: "/admin/contacts",
    label: "Liên hệ", // Contacts
    icon: <PhoneCall className="p-1 bg-blue-900 rounded text-white" />,
    key: "contacts",
  },
  {
    href: "/admin/blog",
    label: "Bài viết", // Blog
    icon: <FileText className="p-1 bg-blue-900 rounded text-white" />,
    key: "blog",
  },
  {
    href: "/admin/categories_blogs",
    label: "Danh mục bài viết", // Categories Blogs
    icon: <Newspaper className="p-1 bg-blue-900 rounded text-white" />,
    key: "categories_blogs",
  },
  {
    href: "/admin/contracts",
    label: "Hợp đồng", // Contracts
    icon: <Minimize className="p-1 bg-blue-900 rounded text-white" />,
    key: "contracts",
  },
  {
    href: "/admin/buildings",
    label: "Tòa nhà", // Buildings
    icon: <Building className="p-1 bg-blue-900 rounded text-white" />,
    key: "buildings",
  },
  {
    href: "/admin/area",
    label: "Khu vực", // Area
    icon: <Map className="p-1 bg-blue-900 rounded text-white" />,
    key: "area",
  },
  {
    href: "/admin/room",
    label: "Phòng", // Room
    icon: <Home className="p-1 bg-blue-900 rounded text-white" />,
    key: "room",
  },
  {
    href: "/admin/orders",
    label: "Hóa đơn", // Room
    icon: <Receipt className="p-1 bg-blue-900 rounded text-white" />,
    key: "orders",
  },
  {
    href: "/admin/banners",
    label: "Biểu ngữ", // Banners
    icon: <Image className="p-1 bg-blue-900 rounded text-white" />,
    key: "banners",
  },
  {
    href: "/admin/comment",
    label: "Bình luận", // Settings
    icon: <MessageCircle  className="p-1 bg-blue-900 rounded text-white" />,
    key: "comment",
  },
  {
    href: "/admin/settings",
    label: "Cài đặt", // Settings
    icon: <Settings className="p-1 bg-blue-900 rounded text-white" />,
    key: "settings",
  },
];

export default function RootLayout({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const profile = await profileAPI(); // Fetch user profile
          if (profile && profile.length > 0) {
            const user = profile[0];
            console.log(profile[0]);

            setIsAdmin(user.role === 0); // Assuming role 0 is admin
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [token]);

  useEffect(() => {
    if (
      !loading &&
      !isAdmin &&
      router &&
      router.pathname &&
      router.pathname.startsWith("/admin")
    ) {
      router.push("/"); // Redirect to homepage if not an admin
    }
  }, [loading, isAdmin, router]);

  if (loading) return <div>Loading...</div>; // Optionally show a loading state

  const activeTabLabel =
    navItems.find((item) => item.key === activeTab)?.label || "Dashboard";

  return (
    <div className="flex bg-gray-100 h-screen">
      {isAdmin ? (
        <>
          <aside className="w-18 md:w-64 h-full shadow-md flex flex-col justify-between bg-white">
            <div>
              <img
                src="/Logo.svg" // Path relative to the 'public' folder
                alt="Logo"
                className="w-full p-2 hidden md:block"
              />

              <img
                src="../favicon.ico"
                alt="Favicon"
                className="h-[72px] p-2 border-4 border-blue-900 sm:block md:hidden"
              />
              <nav className="space-y-2 text-sm font-semibold md:px-2 p-0">
                {navItems.map(({ href, label, icon, key }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center space-x-0 lg:space-x-3  px-4 py-3 transition-colors duration-200 ${activeTab === key
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-900"
                      }`}
                  >
                    {icon}
                    <span className="hidden md:block">{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <Button
              variant="orange"
              className="space-y-2 text-sm font-semibold md:rounded-lg rounded-none m-0 md:mx-2 md:mb-4 px-4 py-3"
            >
              <Link
                href="/"
                className="flex items-center space-x-0 rounded lg:space-x-3 transition-colors duration-200"
              >
                <DoorOpen />
                <span className="hidden md:block">Về trang chủ</span>
              </Link>
            </Button>
          </aside>

          <main className="flex-1 flex flex-col">
            <header className="bg-blue-900 shadow-sm text-white">
              <div className="p-4 flex justify-between items-center">
                <h2 className="font-semibold text-xl">{activeTabLabel}</h2>
                <div className="flex items-center">

                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex rounded-lg items-center p-1 bg-white text-blue-950 ml-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Tác giả" />
                        <AvatarFallback>QT</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="secondary"
                        className=""
                      >
                        Quản trị
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
                      <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                      <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </main>
          <ToastContainer />
        </>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
