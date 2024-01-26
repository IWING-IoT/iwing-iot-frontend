"use client";

import { clientFetchData } from "@/lib/data-fetching";
import { Button } from "../ui/button";
import { CSVLink } from "react-csv";
import { DownloadCloud } from "lucide-react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export default function DownloadMessagesButton({
  deploymentId,
  deviceId,
}: {
  deploymentId: string;
  deviceId: string;
}) {
  const { data: csvData, isLoading } = useQuery({
    queryKey: ["csv", deploymentId, deviceId],
    queryFn: async () => {
      const data: string = await clientFetchData(`/phase/${deploymentId}/csv`, [
        { key: "option", value: "separate" },
        { key: "devicePhaseId", value: deviceId },
      ]);
      return data;
    },
  });
  if (isLoading) {
    return <Skeleton className="h-10 w-[177px]" />;
  }
  return (
    <Button asChild>
      {csvData && (
        <CSVLink data={csvData} filename={"messages.csv"} target="_blank">
          <DownloadCloud className="mr-2 h-5 w-5" />
          Download as CSV
        </CSVLink>
      )}
    </Button>
  );
}
