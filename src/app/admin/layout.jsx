"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Image
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

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="p-1 bg-blue-900 rounded text-white" />, key: "dashboard" },
  { href: "/admin/users", label: "Users", icon: <Users className="p-1 bg-blue-900 rounded text-white" />, key: "users" },
  { href: "/admin/contacts", label: "Contacts", icon: <PhoneCall className="p-1 bg-blue-900 rounded text-white" />, key: "contacts" },
  { href: "/admin/contracts", label: "Contracts", icon: <FileText className="p-1 bg-blue-900 rounded text-white" />, key: "contracts" },
  { href: "/admin/rooms", label: "Rooms", icon: <Bed className="p-1 bg-blue-900 rounded text-white" />, key: "rooms" },
  { href: "/admin/buildings", label: "Buildings", icon: <Building className="p-1 bg-blue-900 rounded text-white" />, key: "buildings" },
  { href: "/admin/banners", label: "Banners", icon: <Image className="p-1 bg-blue-900 rounded text-white" />, key: "banners" },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="p-1 bg-blue-900 rounded text-white" />, key: "settings" },
];

export default function RootLayout({ children }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const path = router.pathname;
    if (path) {
      const foundTab = navItems.find(item => path.includes(item.href));
      setActiveTab(foundTab ? foundTab.key : "dashboard");
    }
  }, [router.pathname]);

  const activeTabLabel = navItems.find(item => item.key === activeTab)?.label || "Dashboard";

  return (
    <div className="flex bg-gray-100 h-screen">
      <aside className="w-64 shadow-md overflow-y-auto bg-white">
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
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-blue-900 shadow-sm text-white">
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-semibold text-xl ">{activeTabLabel}</h2>
            <div className="flex items-center">
              <Button variant="secondary"  size="icon" className="mr-2 bg-white text-blue-950">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary"  className="flex items-center bg-white text-blue-950">
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
    </div>
  );
}
