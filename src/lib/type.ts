import { ISODateString } from "next-auth";

export type TProject = {
  id: string;
  name: string;
  owner: string;
  location: TLocation;
  startedAt: string;
  activePhaseId: string | null;
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

export type TPhaseDetails = {
  _id: string;
  name: string;
  ownerName: string;
  startedAt: string;
  endedAt: string | null;
};

export type TCreateUserAccountDetails = {
  name: string;
  email: string;
  password: string;
  role: string;
};
