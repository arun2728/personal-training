import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arun's Workout Tracker | PT with Aanchal",
  description: "Track daily 5-day workout routines, set recordings, and weights for Aanchal.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PT Tracker",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-black text-[#ededed] antialiased dark">
      <body className="min-h-full flex flex-col font-sans select-none pb-safe bg-black">
        {children}
      </body>
    </html>
  );
}
