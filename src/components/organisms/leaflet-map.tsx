"use client";

import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { cn } from "@/lib/utils";

type LeafletMapProps = {
  center: [number, number];
  zoom: number;
  scrollWheelZoom: boolean;
  className?: string;
  markers?: { position: [number, number]; content: React.ReactNode }[];
};

export default function LeafletMap({
  center,
  zoom,
  scrollWheelZoom,
  className,
  markers,
}: LeafletMapProps) {
  return (
    <MapContainer
      className={cn("z-0 h-full min-h-[20rem] w-full", className)}
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Tooltip>{marker.content}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
