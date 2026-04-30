import type { Metadata } from "next";
import { siteMetadata } from "./lib/metadata";
import { Rubik} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const font = Rubik({
  weight: ["400", "500", "700","800","900"],
  variable: "--font-rubik",
  subsets: ["latin"],
});



export const metadata:Metadata = siteMetadata;  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${font.className} h-full antialiased`}
    >
      <body >
          <Navbar />
        {children}
      </body>
    </html>
  );
}
