"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

type RouterBackButtonProps = {
  variant?: "link" | "outline" | "default" | "ghost";
};

export function RouterBackButton({ variant }: RouterBackButtonProps) {
  const router = useRouter();
  return (
    <Button type="button" variant={variant} onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-5 w-5" />
      Back
    </Button>
  );
}
