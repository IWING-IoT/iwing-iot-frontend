import {
  CardHeader,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/organisms/leaflet-map"), {
  ssr: false,
});

export default function Map() {
  return (
    <div className="grid h-full grid-cols-3">
      <LeafletMap
        className="col-span-2"
        center={[13.8476, 100.5696]}
        zoom={15}
        scrollWheelZoom
      />
      <div className="col-span-1 bg-background">
        <CardHeader>
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
      </div>
    </div>
  );
}
