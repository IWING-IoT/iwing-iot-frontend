import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-[10px] py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        error:
          "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318] dark:border-[#912018] dark:bg-[#55160C] dark:text-[#FDA29B]",
        outline: "text-foreground",
        success:
          "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647] dark:border-[#085D3A] dark:bg-[#053321] dark:text-[#75E0A7]",
        warning:
          "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708] dark:border-[#93370D] dark:bg-[#4E1D09] dark:text-[#FEC84B]",
        gray: "border-[#EAECF0] bg-[#F9FAFB] text-[#344054] dark:border-[#333741] dark:bg-[#161B26] dark:text-[#CECFD2]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
