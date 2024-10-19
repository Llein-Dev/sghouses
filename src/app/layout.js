import { HeaderComponent } from "@/components/header";
import "./globals.css";
import { FooterComponent } from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your website description goes here" />
        <meta name="keywords" content="your, keywords, go, here" />
        <meta name="author" content="Your Name or Company" />

        {/* Fonts and other resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

        {/* Page Title */}
        <title>Your Website Title</title>
      </head>
      <body className="antialiased montserrat-header">
        <HeaderComponent />
        <div className="mt-[72px] bg-gray-100">
          {children}
        </div>
        <FooterComponent />
      </body>
    </html>
  );
}

