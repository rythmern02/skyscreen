import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const SITE = "https://skyscreen.aero";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "SkyScreen — Advertising Has Left The Ground",
    template: "%s · SkyScreen",
  },
  description:
    "SkyScreen flies a massive drone-suspended LED screen into the night sky — broadcasting live video, advertising and immersive aerial experiences visible from hundreds of meters.",
  keywords: [
    "drone LED screen",
    "aerial advertising",
    "flying billboard",
    "drone advertising",
    "outdoor advertising",
    "live aerial broadcast",
    "drone show",
    "SkyScreen",
  ],
  authors: [{ name: "SkyScreen" }],
  creator: "SkyScreen",
  openGraph: {
    type: "website",
    url: SITE,
    title: "SkyScreen — Advertising Has Left The Ground",
    description:
      "A massive flying LED screen carried by autonomous drones. Transform the sky into the world's most unforgettable billboard.",
    siteName: "SkyScreen",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "SkyScreen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyScreen — Advertising Has Left The Ground",
    description:
      "A massive flying LED screen carried by autonomous drones. The sky is the new billboard.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SkyScreen",
  url: SITE,
  description:
    "Drone-suspended flying LED screen advertising for brands, events, concerts and campaigns.",
  slogan: "Advertising Has Left The Ground.",
  sameAs: [
    "https://www.instagram.com/skyscreen",
    "https://www.linkedin.com/company/skyscreen",
    "https://www.youtube.com/@skyscreen",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Aerial LED Screen Advertising",
      serviceType: "Drone flying LED billboard",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=new URLSearchParams(location.search).get('theme');var t=p||localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}if(p){localStorage.setItem('theme',p);}}catch(e){}})();",
          }}
        />
      </head>
      <body className="grain bg-void text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
