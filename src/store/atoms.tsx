import { atom } from "jotai";

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
