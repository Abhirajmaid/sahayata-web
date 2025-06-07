import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/src/components";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Sahayata - Empowering Lives Through Service",
    template: "Sahayata",
  },
  description:
    "Join us in our mission to provide food, education, and healthcare to those in need. Together we can make a difference.",
  openGraph: {
    title: "Sahayata - Empowering Lives Through Service",
    description:
      "Join us in our mission to provide food, education, and healthcare to those in need.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sahayata Foundation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
