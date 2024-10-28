"use client";

import { HeaderComponent } from "@/components/header";
import "./globals.css";
import { FooterComponent } from "@/components/footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import MotionWrapper from "@/components/motionWrapper";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/loading";
import { profileAPI } from "@/utils/api/Auth/api";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname.startsWith('/admin');
  const token = Cookies.get("token");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const profile = await profileAPI();
          if (profile && profile.length > 0) {
            const user = profile[0];
            console.log(user);
            setIsAdmin(user.role === 0);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [token]);

  useEffect(() => {
    if (!loading && isAdminRoute && !isAdmin) {
      router.push("/");
    }
  }, [loading, isAdmin, isAdminRoute, router]);
  const isNotFoundPage = pathname === "/not-found";
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SGHouses - Tìm nhà trọ, phòng trọ cho thuê tại Việt Nam." />
        <meta name="keywords" content="SGHouses, thuê nhà, thuê phòng trọ" />
        <meta name="author" content="SGHouses Team" />
        <title>SGHouses - Tìm Nhà Trọ Hồ Chí Minh</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://messenger.svc.chative.io/static/v1.0/channels/s234b8103-0c4b-4d7d-bf67-f1c60325ddf5/messenger.js?mode=livechat"
          defer
        ></script>
      </head>
      <body className="antialiased montserrat-header">
        <Provider store={store}>
          {loading ? (
            <div className="h-screen w-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Render layout only if not on the Not Found page */}
              {!isNotFoundPage && (isAdminRoute && isAdmin ? (
                children
              ) : (
                <>
                  <HeaderComponent />
                  <div className="mt-[72px] bg-gray-100 overflow-y-auto">
                    <MotionWrapper animationType="fade" key={pathname}>
                      {children}
                    </MotionWrapper>
                  </div>
                  <FooterComponent />
                </>
              ))}
              {/* Render children for the Not Found page */}
              {isNotFoundPage && children}
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
