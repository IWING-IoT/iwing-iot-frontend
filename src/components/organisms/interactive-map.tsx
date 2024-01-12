"use client";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LeafletMap = dynamic(() => import("@/components/organisms/leaflet-map"), {
  ssr: false,
});

export function InteractiveMap() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [mode, setMode] = useState<"all" | "detail">("all");
  return (
    <div className="relative h-full">
      <LeafletMap center={[13.8476, 100.5696]} zoom={16} scrollWheelZoom />
      <Button
        className="absolute right-6 top-5"
        variant={"outline"}
        size={"icon"}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div
        className={cn(
          "absolute z-10 flex w-96 flex-col bg-background shadow-lg",
          showSidebar ? "bottom-0 right-0 top-0" : "hidden",
        )}
      >
        <CardHeader className="flex-grow-0">
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
          </CardHeaderTextContent>
          <CardHeaderActions>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeaderActions>
        </CardHeader>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <p className="font-medium">Device 1</p>
            </div>
            <ChevronRight className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
