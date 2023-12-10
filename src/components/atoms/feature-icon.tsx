import { cn } from "@/lib/utils";

type FeatureIconProps = {
  icon: React.ReactNode;
  variant: "brand" | "error" | "success" | "warning";
  className?: string;
};

const color = {
  brand: {
    bg: "bg-[#F4EBFF] dark:bg-[#7F56D9]",
    text: "text-[#7F56D9] dark:text-[#E9D7FE]",
  },
  error: {
    bg: "bg-[#FEE4E2] dark:bg-[#D92D20]",
    text: "text-[#D92D20] dark:text-[#FECDCA]",
  },
  success: {
    bg: "bg-[#DCFAE6] dark:bg-[#079455]",
    text: "text-[#079455] dark:text-[#ABEFC6]",
  },
  warning: {
    bg: "bg-[#FEF0C7] dark:bg-[#DC6803]",
    text: "text-[#DC6803] dark:text-[#FEDF89]",
  },
};

export function FeatureIcon({ icon, variant, className }: FeatureIconProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full",
        color[variant].bg,
        className,
      )}
    >
      <div className={color[variant].text}>{icon}</div>
    </div>
  );
}
