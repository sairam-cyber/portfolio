import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sai Ram Bebarta | Full Stack Developer",
  description: "Portfolio of Sai Ram Bebarta, a Full Stack Developer specializing in MERN stack and Python backend development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} selection:bg-orange-500 selection:text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
