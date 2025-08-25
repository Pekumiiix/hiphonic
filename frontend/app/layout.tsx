import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLayout } from "@/provider/global-layout";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hiphonic | Project Management Platform",
    template: "%s | Hiphonic",
  },
  description:
    "Hiphonic is a modern project management platform designed to help teams collaborate, organize tasks, and boost productivity. Manage your projects, track progress, and achieve your goals efficiently.",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  keywords: [
    "Hiphonic",
    "Project Management",
    "Task Management",
    "Team Collaboration",
    "Productivity",
    "Dashboard",
    "Kanban",
    "SaaS",
  ],
  openGraph: {
    title: "Hiphonic | Project Management Platform",
    description:
      "Collaborate, organize, and manage your projects with Hiphonic. Empower your team and streamline your workflow.",
    url: "https://hiphonic-blue.vercel.app/sign-in",
    siteName: "Hiphonic",
    images: [
      {
        url: "/assets/logo.png",
        width: 512,
        height: 512,
        alt: "Hiphonic Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hiphonic | Project Management Platform",
    description:
      "Collaborate, organize, and manage your projects with Hiphonic. Empower your team and streamline your workflow.",
    images: ["/assets/logo.png"],
  },
  applicationName: "Hiphonic",
  authors: [{ name: "Pelumi Amao", url: "https://github.com/Pekumiiix" }],
  creator: "Pelumi Amao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased flex justify-center`}>
        <GlobalLayout>{children}</GlobalLayout>
        <Toaster />
      </body>
    </html>
  );
}
