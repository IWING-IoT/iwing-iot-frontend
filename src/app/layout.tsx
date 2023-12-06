import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { JotaiProvider } from "@/components/providers/jotai-provider";
import { SonnerToasterProvider } from "@/components/providers/sonner-toaster-provider";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { DrawerWrapper } from "@/components/atoms/drawer-wrapper";
import { ShowDialog } from "@/components/organisms/dialogs/show-dialog";

export const metadata: Metadata = {
  title: "IWING IoT",
  description: "IoT Tracking Platform for IWING Lab",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains_mono.variable}`}
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
              <SonnerToasterProvider />
              <ShowDialog />
            </JotaiProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
