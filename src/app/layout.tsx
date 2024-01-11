import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { JotaiProvider } from "@/components/providers/jotai-provider";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { DrawerWrapper } from "@/components/atoms/drawer-wrapper";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";

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
      className={`${jetbrains_mono.variable}`}
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
