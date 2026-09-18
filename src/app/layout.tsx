import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARTISAN.DEV | Premium Digital Product & Custom Software Agency",
  description: "We design and engineer high-performance websites, web applications, SaaS platforms, and custom software solutions for ambitious digital brands.",
  keywords: ["Digital Agency", "Web Development", "Web Applications", "Custom Software", "Next.js Agency", "UI UX Design"],
  openGraph: {
    title: "ARTISAN.DEV | Digital Products & Software Studio",
    description: "Ideas In. Scalable Digital Products Out.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable} dark`}>
      <body className="bg-[#050505] text-[#F5F5F5] min-h-screen flex flex-col antialiased selection:bg-[#6C63FF] selection:text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
