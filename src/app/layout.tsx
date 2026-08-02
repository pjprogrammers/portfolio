import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Starfield from "@/components/starfield";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jashansingla.vercel.app"),
  title: {
    default: "Jashan Singla — Security Research & AI Systems",
    template: "%s | Jashan Singla",
  },
  description:
    "Jashan Singla. Penetration testing, digital forensics, OSINT, and agentic AI development.",
  keywords: [
    "Jashan Singla",
    "cybersecurity",
    "penetration testing",
    "digital forensics",
    "OSINT",
    "agentic AI",
    "security research",
  ],
  authors: [{ name: "Jashan Singla" }],
  creator: "Jashan Singla",
  publisher: "Jashan Singla",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jashan Singla",
    title: "Jashan Singla — Security Research & AI Systems",
    description:
      "Jashan Singla. Penetration testing, digital forensics, OSINT, and agentic AI development.",
    url: "https://jashansingla.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jashan Singla — Security Research & AI Systems",
    description:
      "Jashan Singla. Penetration testing, digital forensics, OSINT, and agentic AI development.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Jashan Singla",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  category: "technology",
  verification: {
    google: "yD0EuT3GHCroc_8sUd70Nt-puSwrlKEdsar7YRDcx_M",
  },
};

export const viewport: Viewport = {
  themeColor: "#090b10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${fraunces.variable} bg-background font-sans text-foreground antialiased`}
      >
        <Starfield />
        {children}
      </body>
    </html>
  );
}
