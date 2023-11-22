import type { Metadata } from "next";
import { Inter, Roboto_Mono, Sarabun } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryClientProvider from "@/components/providers/query-client-provider";

export const metadata: Metadata = {
  title: "IWING IoT",
  description: "IoT Tracking Platform for IWING Lab",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
});

const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sarabun",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} ${sarabun.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>{children}</QueryClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
