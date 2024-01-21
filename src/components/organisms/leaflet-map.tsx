"use client";

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { mapActionAtom } from "@/store/atoms";
import { useEffect } from "react";

type LeafletMapProps =
  | {
      type: "default";
      scrollWheelZoom: boolean;
      className?: string;
      markers: {
        id: string;
        position: [number, number];
        content: React.ReactNode;
      }[];
      layers?: never;
    }
  | {
      type: "withLayerControl";
      scrollWheelZoom: boolean;
      className?: string;
      markers?: never;
      layers: {
        name: string;
        checked: boolean;
        markers?: {
          id: string;
          position: [number, number];
          content: React.ReactNode;
          onClick?: () => void;
        }[];
        vectors?: {
          id: string;
          position: [number, number][];
          color: string;
          type: "polyline" | "polygon";
          content: React.ReactNode;
          onClick?: () => void;
        }[];
      }[];
    };

export default function LeafletMap({
  type,
  scrollWheelZoom,
  className,
  markers,
  layers,
}: LeafletMapProps) {
  return (
    <MapContainer
      className={cn("z-0 h-full min-h-[32rem] w-full", className)}
      bounds={
        type === "default"
          ? markers?.map((marker) => marker.position)
          : layers
              .map((layer) =>
                layer.markers
                  ? layer.markers?.map((marker) => marker.position)
                  : layer.vectors?.map((vector) => vector.position),
              )
              .flat()
              .filter((item): item is [number, number] => item !== undefined)
      }
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {type === "default" ? (
        <>
          {markers?.map((marker, index) => (
            <Marker key={`${marker.id}-${index}`} position={marker.position}>
              <Tooltip>{marker.content}</Tooltip>
            </Marker>
          ))}
        </>
      ) : (
        <LayersControl position="topleft">
          {layers.map((layer, index) => (
            <LayersControl.Overlay
              key={`${layer.name}-${index}`}
              checked={layer.checked}
              name={layer.name}
            >
              <LayerGroup>
                {layer.markers?.map((marker, index) => (
                  <Marker
                    key={`${marker.id}-${index}`}
                    position={marker.position}
                    {...(marker.onClick
                      ? { eventHandlers: { click: marker.onClick } }
                      : {})}
                  >
                    <Tooltip>{marker.content}</Tooltip>
                  </Marker>
                ))}
                {layer.vectors?.map((vector, index) =>
                  vector.type === "polygon" ? (
                    <Polygon
                      key={`${vector.id}-${index}`}
                      pathOptions={{ color: vector.color }}
                      positions={vector.position}
                      {...(vector.onClick
                        ? { eventHandlers: { click: vector.onClick } }
                        : {})}
                    >
                      <Tooltip>{vector.content}</Tooltip>
                    </Polygon>
                  ) : (
                    <Polyline
                      key={`${vector.id}-${index}`}
                      pathOptions={{ color: vector.color }}
                      positions={vector.position}
                      {...(vector.onClick
                        ? { eventHandlers: { click: vector.onClick } }
                        : {})}
                    >
                      <Tooltip>{vector.content}</Tooltip>
                    </Polyline>
                  ),
                )}
              </LayerGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
      )}
      <MapAction />
    </MapContainer>
  );
}

function MapAction() {
  const [mapAction, setMapAction] = useAtom(mapActionAtom);
  const map = useMap();
  useEffect(() => {
    if (mapAction !== null) {
      if (mapAction.type === "flyTo") {
        map.flyTo(mapAction.position, 10);
      } else if (mapAction.type === "flyToBounds") {
        map.flyToBounds(mapAction.position);
      }
      setMapAction(null);
    }
  }, [mapAction, map, setMapAction]);
  return null;
}
