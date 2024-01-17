import { cn } from "@/lib/utils";

type FeatureIconProps = {
  icon: React.ReactNode;
  variant: "error" | "success" | "warning" | "modern";
  className?: string;
};

const iconVariant = {
  error: {
    bg: "bg-[#FEE4E2] dark:bg-[#D92D20]",
    text: "text-[#D92D20] dark:text-[#FECDCA]",
    rounded: "rounded-full",
    shadow: "shadow-none",
    border: "border-none",
  },
  success: {
    bg: "bg-[#DCFAE6] dark:bg-[#079455]",
    text: "text-[#079455] dark:text-[#ABEFC6]",
    rounded: "rounded-full",
    shadow: "shadow-none",
    border: "border-none",
  },
  warning: {
    bg: "bg-[#FEF0C7] dark:bg-[#DC6803]",
    text: "text-[#DC6803] dark:text-[#FEDF89]",
    rounded: "rounded-full",
    shadow: "shadow-none",
    border: "border-none",
  },
  modern: {
    bg: "bg-background",
    text: "text-foreground",
    rounded: "rounded-lg",
    shadow: "shadow-xs",
    border: "border",
  },
};

export function FeatureIcon({ icon, variant, className }: FeatureIconProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center",
        iconVariant[variant].bg,
        iconVariant[variant].rounded,
        iconVariant[variant].shadow,
        iconVariant[variant].border,
        className,
      )}
    >
      <div className={iconVariant[variant].text}>{icon}</div>
    </div>
  );
}
