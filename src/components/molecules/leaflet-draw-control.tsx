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
import { deleteData, patchData, postData, putData } from "@/lib/data-fetching";
import { TArea, TCustomMarker, THttpError } from "@/lib/type";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

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
  const editMarker = useMutation({
    mutationFn: (data: TCustomMarker) => patchData(`/mark/${data.id}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      queryClient.invalidateQueries({ queryKey: ["customMarker"] });
    },
  });
  const deleteMarker = useMutation({
    mutationFn: (markerId: string) => deleteData(`/mark/${markerId}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete marker", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Marker deleted successfully");
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
  const editArea = useMutation({
    mutationFn: (data: Omit<TArea, "alert">) =>
      putData(`/area/${data.id}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      queryClient.invalidateQueries({ queryKey: ["area"] });
    },
  });
  const deleteArea = useMutation({
    mutationFn: (areaId: string) => deleteData(`/area/${areaId}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete area", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Area deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["area"] });
    },
  });

  const handleCreate = (e: any) => {
    // console.log(e.layer.toGeoJSON().geometry.type);
    setShowDialog({
      show: true,
      title: `Add new ${type === "marker" ? "marker" : "area"}`,
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
  const handleEdit = (e: any) => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === "FeatureCollection") {
      // setGeoJson(geo);
      // console.log(geo.features.find((item) => item.properties.id === "1"));
      if (type === "polygon") {
        e.layers.getLayers().forEach((layer: any) => {
          // console.log(layer);
          const editedLayer = geo.features.find(
            (item) => item.properties.id === layer.feature.properties.id,
          );
          const editedArea = {
            id: editedLayer?.properties.id,
            name: editedLayer?.properties.name,
            description: editedLayer?.properties.description,
            coordinates: (editedLayer?.geometry as any).coordinates[0].map(
              (item: any) => item.slice().reverse(),
            ),
            isActive: false,
          };
          // console.log(editedArea);
          editArea.mutate(editedArea);
        });
      } else {
        e.layers.getLayers().forEach((layer: any) => {
          const editedLayer = geo.features.find(
            (item) => item.properties.id === layer.feature.properties.id,
          );
          const editedMarker = {
            id: editedLayer?.properties.id,
            name: editedLayer?.properties.name,
            description: editedLayer?.properties.description,
            latitude: (editedLayer?.geometry as any).coordinates[1],
            longitude: (editedLayer?.geometry as any).coordinates[0],
          };
          editMarker.mutate(editedMarker);
        });
      }
    }
  };
  const debouncedHandleEdit = useDebouncedCallback(handleEdit, 500);
  const handleDelete = (e: any) => {
    // console.log("delete event triggered");
    console.log(e.layers.getLayers());
    if (type === "polygon") {
      // console.log(e.layers.getLayers());
      e.layers.getLayers().forEach((layer: any) => {
        deleteArea.mutate(layer.feature.properties.id);
      });
    } else {
      e.layers.getLayers().forEach((layer: any) => {
        deleteMarker.mutate(layer.feature.properties.id);
        // ref.current?.removeLayer(layer);
      });
    }
  };
  const debouncedHandleDelete = useDebouncedCallback(handleDelete, 500);

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topleft"
        onEdited={(e) => debouncedHandleEdit(e)}
        onCreated={handleCreate}
        onDeleted={(e) => debouncedHandleDelete(e)}
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
