import NavBar from "../component/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../component/AuthProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LU Cyber Lifts",
  description: "Record your lifts. Crush your opposition. Made with ❤️ by cameron",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="gradient-radial">
          <div className="flex flex-col min-h-screen max-w-[70rem] mx-auto px-4 md:px-2">
            <AuthProvider>
              <NavBar/>
              {children}
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
