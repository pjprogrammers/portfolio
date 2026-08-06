import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import { education, profile, skills } from "@/lib/portfolio";
import Loader from "@/components/loader";
import SiteBackground from "@/components/webgl/site-background";
import { PerformanceViewer } from "@/components/dev/PerformanceViewer";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jashansingla.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Jashan Singla — Security Research & AI Systems",
    template: "%s | Jashan Singla",
  },
  description:
    "Jashan Singla. Penetration testing, digital forensics, OSINT, and agentic AI development.",
  keywords: [
    "Jashan Singla",
    "Jashan",
    "jashansingla",
    "Jashan Singla portfolio",
    "Jashan Singla cybersecurity",
    "Jashan Singla AI",
    "Jashan Singla Sirsa",
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
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_WEBMASTER_VERIFICATION_CODE",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#090b10",
};

const siteUrl = "https://jashansingla.vercel.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Jashan Singla",
      alternateName: "jashansingla",
      description:
        "Jashan Singla. Penetration testing, digital forensics, OSINT, and agentic AI development.",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      url: `${siteUrl}/`,
      name: "Jashan Singla",
      alternateName: ["Jashan", "jashansingla", "Jashan Singla cybersecurity"],
      givenName: "Jashan",
      familyName: "Singla",
      jobTitle: profile.role,
      worksFor: {
        "@type": "Organization",
        name: profile.org,
      },
      email: `mailto:${profile.email}`,
      image: `${siteUrl}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sirsa",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education.school,
      },
      knowsAbout: skills,
      sameAs: [profile.linkedin],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${fraunces.variable} ${instrumentSerif.variable} bg-background font-sans text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Loader />
        <SiteBackground />
        {children}
        <PerformanceViewer />
      </body>
    </html>
  );
}
