import { ISODateString } from "next-auth";

export type TProject = {
  id: string;
  name: string;
  owner: string;
  location: TLocation;
  startedAt: string;
};

export type TUser = {
  name: string;
  email: string;
  role: string;
};

export type TTemplate = {
  id: string;
  name: string;
  description: string;
};

export type TLocation = {
  id: string;
  en_name: string;
  th_name: string;
};

export type TProjectDetails = {
  template: string;
  name: string;
  location: string;
  startedAt: string;
  description: string;
};
