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
  | { type: "flyTo"; position: LatLngExpression }
  | { type: "flyToBounds"; position: LatLngBoundsExpression }
  | null
>(null);

export const deviceVisibilityAtom = atom<string[]>([]);
