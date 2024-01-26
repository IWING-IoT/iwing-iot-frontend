import { FeatureCollection } from "geojson";
import { atom } from "jotai";
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";

export const sheetAtom = atom<boolean>(false);
export const showDialogAtom = atom<{
  show: boolean;
  title: string;
  children: React.ReactNode;
}>({
  show: false,
  title: "",
  children: null,
});

export const mapActionAtom = atom<
  | { type: "setView"; position: LatLngExpression }
  | { type: "setBounds"; position: LatLngBoundsExpression }
  | null
>(null);

export const deviceVisibilityAtom = atom<{ [key: string]: boolean }>({});

export const mapStateAtom = atom<"view" | "edit">("view");

export const geoJsonAtom = atom<FeatureCollection>({
  type: "FeatureCollection",
  features: [],
});
