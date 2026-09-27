
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { FavoritesProvider } from "@/components/FavoritesContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUNELLE",
  description: "Recipe website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          scriptProps={{ type: "application/json" }}
        >
          <FavoritesProvider>
            <Navbar />

            {children}

            <Footer />
          </FavoritesProvider>

          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

