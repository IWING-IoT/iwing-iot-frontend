import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { JotaiProvider } from "@/components/providers/jotai-provider";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { DrawerWrapper } from "@/components/atoms/drawer-wrapper";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { Inter, Noto_Sans_Thai, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ShowDialog = dynamic(
  () => import("@/components/organisms/dialogs/show-dialog"),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "IWING IoT",
  description: "IoT Tracking Platform for IWING Lab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansThai.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <JotaiProvider>
              <QueryClientProvider>
                <DrawerWrapper>{children}</DrawerWrapper>
              </QueryClientProvider>
              <Toaster />
              <ShowDialog />
            </JotaiProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
