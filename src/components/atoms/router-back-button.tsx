"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

type RouterBackButtonProps = {
  variant?: "link" | "outline" | "default" | "ghost";
  className?: string;
  label?: string;
};

export function RouterBackButton({
  variant,
  className,
  label = "Back",
}: RouterBackButtonProps) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      {label}
    </Button>
  );
}
