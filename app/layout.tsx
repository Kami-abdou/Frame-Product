import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const interBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FRAME | The Scene, Defined.",
  description:
    "Curated cultural experiences across Tunisia. From candlelit concerts in Carthage to underground art in La Marsa. Your invitation to extraordinary.",
  keywords: [
    "events",
    "Tunisia",
    "culture",
    "experiences",
    "nightlife",
    "art",
    "curated",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${interBody.variable} ${jetbrainsMono.variable} font-body antialiased bg-frame-black text-frame-white grain`}
      >
        {children}
      </body>
    </html>
  );
}
