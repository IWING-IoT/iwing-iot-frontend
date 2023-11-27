export type TProject = {
  id: string;
  name: string;
  owner: string;
  location: string;
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
