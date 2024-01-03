"use client";
import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CopyableInputProps = {
  value: string;
  className?: string;
};

export function CopyableInput({ value, className }: CopyableInputProps) {
  const [success, setSuccess] = useState<boolean>(false);
  return (
    <div className={cn("flex", className)}>
      <Input className="z-0 rounded-r-none" value={value} readOnly />
      <Button
        className="rounded-l-none border-l-0"
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          navigator.clipboard.writeText(value);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 1000);
        }}
      >
        {success ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </Button>
    </div>
  );
}
