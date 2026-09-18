import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

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
  title: "Bright Space | Premium Motion & Digital Product Studio",
  description: "We design and engineer high-performance websites, 3D interactive experiences, motion design, and custom software for ambitious digital brands.",
  keywords: ["Bright Space", "Motion Design", "3D WebGL", "Digital Studio", "Web Development", "Next.js", "Creative Engineering"],
  openGraph: {
    title: "Bright Space | Creative Motion & Digital Studio",
    description: "We craft kinetic motion and immersive digital experiences.",
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
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
