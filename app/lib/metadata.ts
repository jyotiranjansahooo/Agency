import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: " Orivon | Modern Web Design & Development",
    template: "%s | Orivon",
  },
  description:
    "We build fast, scalable, and beautifully designed websites for startups and businesses.",
  keywords: [
    "web agency",
    "web design",
    "web development",
    "UI UX design",
    "Next.js",
    "React",
    "SEO optimization",
    "digital agency",
  ],
  authors: [{ name: "Jyoti ranjan sahoo" }],
  creator: "Orivon",
  metadataBase: new URL("https://orivon.com"),

  openGraph: {
    title: "Orivon | Modern Web Design & Development",
    description:
      "Crafting high-performance websites and digital experiences that scale.",
    url: "https://orivon.com",
    siteName: "Orivon",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orivon | Modern Web Design & Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Orivon | Modern Web Design & Development",
    description:
      "We design and develop modern, high-performance websites.",
    images: ["/og-image.jpg"],
    creator: "@orivon",
  },

  icons: {
    icon: "/images/Orivon.jpeg",
    shortcut: "/images/Orivon.jpeg",
    apple: "/images/Orivon.jpeg",
    
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://orivon.com",
  },

  category: "technology",
};