import { MarkdownPreview } from "@/components/atoms/markdown-preview";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TFirmwareVersionDetails } from "@/lib/type";
import { Pen } from "lucide-react";
import Link from "next/link";

type DocumentProps = {
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default async function Document({ params }: DocumentProps) {
  const { data: firmwareVersionData }: { data: TFirmwareVersionDetails } =
    await fetchData(`/firmwareVersion/${params.versionId}`);
  return (
    <div className="relative flex-1 rounded-md border p-6">
      <MarkdownPreview value={firmwareVersionData.markdown ?? ""} />
      <Button variant={"outline"} className="absolute right-6 top-6" asChild>
        <Link
          href={`/firmware/${params.firmwareId}/version/${params.versionId}/edit/document`}
        >
          <Pen className="mr-2 h-5 w-5" />
          Edit
        </Link>
      </Button>
    </div>
  );
}
