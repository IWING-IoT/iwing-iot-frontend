"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

function SonnerToasterProvider() {
  const { resolvedTheme } = useTheme();
  const theme = ["light", "dark", "system"].includes(resolvedTheme as string)
    ? (resolvedTheme as "light" | "dark" | "system")
    : undefined;
  return <Toaster richColors theme={theme} closeButton />;
}

export default SonnerToasterProvider;
