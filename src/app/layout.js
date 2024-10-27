"use client";
import { HeaderComponent } from "@/components/header";
import "./globals.css";
import { FooterComponent } from "@/components/footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import MotionWrapper from "@/components/motionWrapper";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode"; // Make sure to import jwtDecode

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter(); // To redirect
  const isAdminRoute = pathname.startsWith('/admin');

  // Check if the user is an admin immediately before rendering
  const token = Cookies.get("token");
  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role === "admin";
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

  // Redirect to home if trying to access admin route and not an admin
  if (isAdminRoute && !isAdmin) {
    router.push("/"); // Redirect if not an admin
    return null; // Prevent rendering the rest of the layout
  }

  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SGHouses - Tìm nhà trọ, phòng trọ cho thuê tại Việt Nam. Nền tảng hàng đầu giúp bạn kết nối với chủ nhà và tìm thuê chỗ ở một cách nhanh chóng, tiện lợi." />
        <meta name="keywords" content="SGHouses, thuê nhà, thuê phòng trọ, nhà trọ Việt Nam, phòng trọ, thuê nhà giá rẻ, thuê phòng trọ Sài Gòn, tìm nhà trọ" />
        <meta name="author" content="SGHouses Team" />
        <title>SGHouses - Tìm Nhà Trọ Hồ Chí Minh</title>

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" as="style" />

        {/* Live Chat Script */}
        <script
          src="https://messenger.svc.chative.io/static/v1.0/channels/s234b8103-0c4b-4d7d-bf67-f1c60325ddf5/messenger.js?mode=livechat"
          defer
        ></script>
      </head>
      <body className="antialiased montserrat-header">
        <Provider store={store}>
          {/* Render layout based on user role */}
          {isAdminRoute ? (
            <>{children}</>
          ) : (
            <>
              <HeaderComponent />
              <div className="mt-[72px] bg-gray-100">
                <MotionWrapper animationType="fade" key={pathname}>
                  {children}
                </MotionWrapper>
              </div>
              <FooterComponent />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
