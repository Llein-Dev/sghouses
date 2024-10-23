"use client";
import { HeaderComponent } from "@/components/header";
import "./globals.css";
import { FooterComponent } from "@/components/footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { usePathname } from "next/navigation";
import AdminDashboardComponent from "./admin/layout";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current pathname

  const isAdminRoute = pathname.startsWith('/admin'); // Check if the current route is for admin

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
          {/* Use AdminLayout for /admin routes, else use default layout */}
          {isAdminRoute ? (
            <>{children}</>
          ) : (
            <>
              <HeaderComponent />
              <div className="mt-[72px] bg-gray-100">{children}</div>
              <FooterComponent />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
