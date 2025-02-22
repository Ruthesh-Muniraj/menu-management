import "./globals.css";
import { Providers } from "./providers";
import { Plus_Jakarta_Sans } from 'next/font/google'
import Sidebar from "@/components/Sidebar";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Menu Management",
  description: "Demo Menu Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakartaSans.className}>
      <body className="flex flex-row item-start">
        <Sidebar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
