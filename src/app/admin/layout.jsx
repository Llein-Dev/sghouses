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
  MessageCircle,
  Mail
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
import { groupedNavItems, navItems } from "@/utils/data";


export default function RootLayout({ children }) {
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
  const [openGroups, setOpenGroups] = useState([]); // State to manage open groups
  const [activeTab, setActiveTab] = useState(null); // State for the active tab
  const activeTabLabel =
    groupedNavItems.find((item) =>
      item.items.some((subItem) => subItem.key === activeTab)
    )?.label || "Dashboard";
  const toggleGroup = (label) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  if (loading) return <div>Loading...</div>; // Optionally show a loading state
  return (
    <div className="flex bg-gray-100 overflow-hidden h-screen">
      {isAdmin ? (
        <>
          <aside className="w-18 md:w-64 h-full shadow-md flex flex-col justify-between bg-white">
            <div>
              <img
                src="/Logo.svg"
                alt="Logo"
                className="w-full p-2 hidden md:block"
              />
              <nav className="md:max-h-[calc(100vh-72px-70px)] max-h-[calc(100vh-72px)] overflow-y-auto space-y-2 text-xs font-semibold md:px-2 p-0">
                {/* Separate Dashboard Link */}
                <Link
                  href="/admin"
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex items-center space-x-0 lg:space-x-3 px-4 py-2 transition-colors duration-200 ${activeTab === "dashboard"
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-900"
                    }`}
                >
                  <LayoutDashboard className="p-1 bg-blue-900 rounded text-white" />
                  <span className="hidden md:block">Bảng điều khiển</span>
                </Link>

                {/* Grouped Navigation Items */}
                {groupedNavItems.map(({ label, icon, items }) => (
                  <div key={label}>
                    <div
                      onClick={() => toggleGroup(label)} // Toggle group on click
                      className="flex items-center w-full space-x-0 lg:space-x-3 px-4 py-2 cursor-pointer transition-colors duration-200 bg-gray-100 text-gray-700"
                    >
                      {icon}
                      <span className="hidden md:block flex-grow text-left">{label}</span>
                    </div>
                    {openGroups.includes(label) && items.map(({ href, label: itemLabel, key }) => (
                      <Link
                        key={key}
                        href={href}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center space-x-0 lg:space-x-3 px-4 py-2 transition-colors duration-200 ${activeTab === key
                          ? "bg-blue-900 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-900"
                          }`}
                      >
                        <span className="hidden md:block pl-6">{itemLabel}</span>
                      </Link>
                    ))}
                  </div>
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
        </>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
  