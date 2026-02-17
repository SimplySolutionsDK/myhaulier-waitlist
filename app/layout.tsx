import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyHaulier — The Freight Marketplace of Tomorrow",
  description:
    "Connect carriers and freight forwarders on one intelligent platform. Streamline logistics, maximize loads, and grow your business. Join the waitlist.",
  openGraph: {
    title: "MyHaulier — The Freight Marketplace of Tomorrow",
    description: "Join the waitlist for the smarter way to move freight.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
