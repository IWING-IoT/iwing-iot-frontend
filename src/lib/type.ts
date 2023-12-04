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

export type TCreateProjectDetails = {
  template?: string;
  name: string;
  location: string;
  startedAt: string;
  description: string;
};

export type THttpError = Error & {
  response: {
    data: {
      message: string;
    };
  };
};

export type TProjectDetails = {
  location: TLocation;
  name: string;
  ownerName: string;
  startedAt: string;
  isArchived: boolean;
  activePhaseId: string | null;
  description: string;
};

export type TCreateUserAccountDetails = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type TPhaseDetails = {
  id: string;
  name: string;
  owner: string;
  isActive: boolean;
  startedAt: "2023-11-22T10:35:00.172Z";
  endedAt: "2023-11-22T11:28:50.433Z";
};
