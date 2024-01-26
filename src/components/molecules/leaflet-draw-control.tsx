"use client";
import * as L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { geoJsonAtom, showDialogAtom } from "@/store/atoms";
import { MapMarkerAreaForm } from "../forms/map-marker-area-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { TArea, TCustomMarker, THttpError } from "@/lib/type";
import { toast } from "sonner";

interface Props {
  type: "polygon" | "marker";
  deploymentId: string;
}

export function LeafletDrawControl({ type, deploymentId }: Props) {
  const ref = useRef<L.FeatureGroup>(null);
  const [showDialog, setShowDialog] = useAtom(showDialogAtom);
  const [geoJson, setGeoJson] = useAtom(geoJsonAtom);

  useEffect(() => {
    if (ref.current?.getLayers().length === 0 && geoJson) {
      L.geoJSON(geoJson).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          if (layer?.feature?.properties.radius && ref.current) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius,
            }).addTo(ref.current);
          } else {
            ref.current?.addLayer(layer);
          }
        }
      });
    }
  }, [geoJson]);

  // useEffect(() => {
  //   console.log("geoJson", geoJson);
  // }, [geoJson]);
  const queryClient = useQueryClient();
  const addMarker = useMutation({
    mutationFn: (data: Omit<TCustomMarker, "id">) =>
      postData(`/phase/${deploymentId}/map/mark`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to add marker", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Marker added successfully");
      queryClient.invalidateQueries({ queryKey: ["customMarker"] });
    },
  });
  const addArea = useMutation({
    mutationFn: (data: Pick<TArea, "name" | "description" | "coordinates">) =>
      postData(`/phase/${deploymentId}/area`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to add area", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Area added successfully");
      queryClient.invalidateQueries({ queryKey: ["area"] });
    },
  });

  const handleCreate = (e: any) => {
    console.log(e.layer.toGeoJSON().geometry.type);
    setShowDialog({
      show: true,
      title: "New",
      children: (
        <MapMarkerAreaForm
          handleSubmit={(data) => {
            if (type === "marker") {
              const newMarker = {
                name: data.name,
                description: data.description,
                latitude: e.layer.toGeoJSON().geometry.coordinates[1],
                longitude: e.layer.toGeoJSON().geometry.coordinates[0],
              };
              addMarker.mutate(newMarker);
            } else {
              const newArea = {
                name: data.name,
                description: data.description,
                coordinates: e.layer
                  .toGeoJSON()
                  .geometry.coordinates[0].map((item: any) => item.reverse()),
              };
              addArea.mutate(newArea);
            }
          }}
          deploymentId={deploymentId}
        />
      ),
    });
  };

  const handleEdit = () => {
    const geo = ref.current?.toGeoJSON();
    console.log(geo);
    if (geo?.type === "FeatureCollection") {
      setGeoJson(geo);
    }
  };

  const handleDelete = () => {
    const geo = ref.current?.toGeoJSON();
    console.log(geo);
    if (geo?.type === "FeatureCollection") {
      setGeoJson(geo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topleft"
        onEdited={handleEdit}
        onCreated={handleCreate}
        onDeleted={handleDelete}
        draw={{
          rectangle: false,
          circle: false,
          polyline: false,
          polygon: type === "polygon",
          marker: type === "marker",
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}
