"use client";

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { geoJsonAtom, mapActionAtom } from "@/store/atoms";
import { useEffect, useState } from "react";
import { LatLngBoundsExpression } from "leaflet";
import { LeafletDrawControl } from "../molecules/leaflet-draw-control";
import { FeatureCollection } from "geojson";

type LeafletMapProps =
  | {
      type: "default";
      action?: never;
      scrollWheelZoom: boolean;
      className?: string;
      bounds: LatLngBoundsExpression;
      markers: {
        id: string;
        position: [number, number];
        content: React.ReactNode;
      }[];
      layers?: never;
      editableLayer?: never;
      deploymentId?: never;
    }
  | {
      type: "withLayerControl";
      action: "view";
      scrollWheelZoom: boolean;
      className?: string;
      bounds: LatLngBoundsExpression;
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
          content: React.ReactNode;
          onClick?: () => void;
        }[];
        areas?: {
          id: string;
          position: [number, number][];
          color: string;
          content: React.ReactNode;
          onClick?: () => void;
        }[];
      }[];
      editableLayer?: never;
      deploymentId?: never;
    }
  | {
      type: "withLayerControl";
      action: "editMarker";
      scrollWheelZoom: boolean;
      className?: string;
      bounds: LatLngBoundsExpression;
      markers?: never;
      layers?: never;
      editableLayer: {
        name: string;
        checked: boolean;
        markers: {
          id: string;
          name: string;
          description: string;
          position: [number, number];
          content: React.ReactNode;
          onClick?: () => void;
        }[];
        areas?: never;
      };
      deploymentId: string;
    }
  | {
      type: "withLayerControl";
      action: "editGeofencing";
      scrollWheelZoom: boolean;
      className?: string;
      bounds: LatLngBoundsExpression;
      markers?: never;
      layers?: never;
      editableLayer: {
        name: string;
        checked: boolean;
        markers?: never;
        areas: {
          id: string;
          name: string;
          description: string;
          position: [number, number][];
          color: string;
          content: React.ReactNode;
          onClick?: () => void;
        }[];
      };
      deploymentId: string;
    };

export default function LeafletMap({
  type,
  action,
  scrollWheelZoom,
  className,
  bounds,
  markers,
  layers,
  editableLayer,
  deploymentId,
}: LeafletMapProps) {
  const defaultGeoJson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  const [geoJson, setGeoJson] = useAtom(geoJsonAtom);
  useEffect(() => {
    let initialGeoJson: FeatureCollection;
    if (editableLayer?.areas && editableLayer.areas.length > 0) {
      initialGeoJson = {
        type: "FeatureCollection",
        features: editableLayer.areas.map((area) => ({
          type: "Feature",
          properties: {
            id: area.id,
            name: area.name,
            description: area.description,
            color: area.color,
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              area.position.map((coord) => coord.slice().reverse()),
            ],
          },
        })),
      };
    } else if (editableLayer?.markers && editableLayer.markers.length > 0) {
      initialGeoJson = {
        type: "FeatureCollection",
        features: editableLayer.markers.map((marker) => ({
          type: "Feature",
          properties: {
            id: marker.id,
            name: marker.name,
            description: marker.description,
          },
          geometry: {
            type: "Point",
            coordinates: marker.position.slice().reverse(),
          },
        })),
      };
    } else {
      initialGeoJson = defaultGeoJson;
    }
    setGeoJson(initialGeoJson);
  }, [type, editableLayer]);

  return (
    <MapContainer
      className={cn("z-0 h-full min-h-[32rem] w-full", className)}
      bounds={bounds}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {type === "default" ? (
        markers?.map((marker, index) => (
          <Marker key={`${marker.id}-${index}`} position={marker.position}>
            <Tooltip>{marker.content}</Tooltip>
          </Marker>
        ))
      ) : (
        <LayersControl position="topleft">
          {action === "view" ? (
            <>
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
                    {layer.vectors?.map((vector, index) => (
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
                    ))}
                    {layer.areas?.map((vector, index) => (
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
                    ))}
                  </LayerGroup>
                </LayersControl.Overlay>
              ))}
            </>
          ) : (
            <LayersControl.Overlay
              key={`${editableLayer.name}`}
              checked={editableLayer.checked}
              name={editableLayer.name}
            >
              <LeafletDrawControl
                type={action === "editMarker" ? "marker" : "polygon"}
                deploymentId={deploymentId}
              />
            </LayersControl.Overlay>
          )}
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
      if (mapAction.type === "setView") {
        map.setView(mapAction.position, 15);
      } else if (mapAction.type === "setBounds") {
        map.fitBounds(mapAction.position);
      }
      setMapAction(null);
    }
  }, [mapAction, map, setMapAction]);
  return null;
}
