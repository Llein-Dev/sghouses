"use client";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // Make sure to import jwtDecode
import Link from "next/link";
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
  DoorOpen
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

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="p-1 bg-blue-900 rounded text-white" />, key: "dashboard" },
  { href: "/admin/users", label: "Users", icon: <Users className="p-1 bg-blue-900 rounded text-white" />, key: "users" },
  { href: "/admin/contacts", label: "Contacts", icon: <PhoneCall className="p-1 bg-blue-900 rounded text-white" />, key: "contacts" },
  { href: "/admin/contracts", label: "Contracts", icon: <FileText className="p-1 bg-blue-900 rounded text-white" />, key: "contracts" },
  { href: "/admin/area", label: "area", icon: <Bed className="p-1 bg-blue-900 rounded text-white" />, key: "area" },
  { href: "/admin/blog", label: "blog", icon: <Bed className="p-1 bg-blue-900 rounded text-white" />, key: "blog" },
  { href: "/admin/buildings", label: "Buildings", icon: <Building className="p-1 bg-blue-900 rounded text-white" />, key: "buildings" },
  { href: "/admin/banners", label: "Banners", icon: <Image className="p-1 bg-blue-900 rounded text-white" />, key: "banners" },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="p-1 bg-blue-900 rounded text-white" />, key: "settings" },
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
    if (!loading && !isAdmin && router && router.pathname && router.pathname.startsWith('/admin')) {
      router.push("/"); // Redirect to homepage if not an admin
    }
  }, [loading, isAdmin, router]);


  if (loading) return <div>Loading...</div>; // Optionally show a loading state

  const activeTabLabel = navItems.find(item => item.key === activeTab)?.label || "Dashboard";

  return (
    <div className="flex bg-gray-100 h-screen">
      {isAdmin ? (
        <>
          <aside className="w-64 h-full shadow-md flex flex-col justify-between bg-white">
            <div>
              <div className="m-2 pb-5 hidden md:block border-b">
                <img src="/logo.svg" alt="" className="w-full" />
              </div>
              <nav className="space-y-2 text-sm font-semibold px-2">
                {navItems.map(({ href, label, icon, key }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center space-x-0 rounded lg:space-x-3 px-4 py-3 transition-colors duration-200 ${activeTab === key
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

            <Button variant="orange" className="space-y-2 text-sm font-semibold mx-2 mb-4">
              <Link
                href="/"
                className={`flex items-center space-x-0 rounded lg:space-x-3 px-4 py-3 transition-colors duration-200`}
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
                  <Button variant="secondary" size="icon" className="mr-2 bg-white text-blue-950">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" className="flex items-center bg-white text-blue-950">
                        Admin User
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
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
