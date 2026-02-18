import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyHaulier — Built for Freight Forwarders",
  description:
    "A new platform connecting freight forwarders to the workforce they need. Join the waitlist.",
  openGraph: {
    title: "MyHaulier — Built for Freight Forwarders",
    description:
      "Join the waitlist. Something new is coming to freight forwarding.",
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
