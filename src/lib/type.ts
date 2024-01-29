export type TProject = {
  id: string;
  name: string;
  owner: string;
  location: string;
  startedAt: string;
  endedAt?: string;
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
  location: string;
  name: string;
  ownerName: string;
  startedAt: string;
  endedAt?: string;
  isArchived: boolean;
  activePhaseId: string | null;
  description: string;
  permission: TUserPermission;
};

export type TUserAccountDetails = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type TDeployment = {
  id: string;
  name: string;
  owner: string;
  isActive: boolean;
  startedAt: string;
  endedAt?: string;
};

export type TDeploymentDetails = {
  id: string;
  name: string;
  ownerName: string;
  startedAt: string;
  endedAt?: string;
  permission: TUserPermission;
  description?: string;
  isActive: boolean;
  isProjectArchived: boolean;
};

export type TInviteCollaborators = {
  email: string;
  permission: string;
}[];

export type TCollaborators = {
  id: string;
  name: string;
  email: string;
  permission: "owner" | "can_edit" | "can_view";
  permissionId: "655cf84bad42c1839d57648c" | "655cf8d3ad42c1839d576491";
};

export type TUserPermission = "can_view" | "can_edit" | "owner";

export type TPermission =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "transferOwnership";

export type TCategory = {
  id: string;
  name: string;
};

export type TCategoryDetails = {
  name: string;
  mainAttribute: string;
  description: string;
  entryDefinitions: TEntryDefinition[];
  attributeEntries: TAttributeEntry[];
};

export type TEntryDefinition = {
  id?: string;
  accessorKey: string;
  type: "string" | "image" | "category_reference";
  category?: TCategory;
};

export type TAttributeEntry = {
  id: string;
  [x: string]: { id: string; name: string } | string;
};

export type TEntry = {
  id: string;
  name: string;
};

export type TAllEntries = {
  [x: string]: TEntry[];
};

export type TDevices = {
  id: string;
  name: string;
  type: "standalone" | "gateway" | "node";
  status: "Available" | "Unavailable" | "In use" | `In use by ${string}`;
  projectId?: string;
  phaseId?: string;
  canAccess?: boolean;
};

export type TDeploymentApi = {
  id: string;
  name: string;
  dataType: "String" | "Number" | "Boolean" | "Date";
  description?: string;
  lock: boolean;
};

export type TDeploymentApiExample = {
  gateway: {
    [x: string]: string;
  };
  default: {
    [x: string]: string;
  };
};

export type TFirmwareType = "source" | "config" | "binary";

export type TFirmware = {
  name: string;
  type: TFirmwareType;
  createdAt: string;
  editedAt: string;
  id: string;
  lastUpdate: string;
};

export type TFirmwareVersion = {
  id: string;
  name: string;
  description?: string;
  gitUrl?: string;
  lastUpdate: string;
};

export type TFirmwareDetails = {
  name: string;
  description?: string;
  type: TFirmwareType;
  versions: TFirmwareVersion[];
};

export type TFirmwareVersionDetails = {
  id: string;
  name: string;
  description?: string;
  gitUrl?: string;
  lastUpdate: string;
  updatedBy: string;
  file: string;
  fileExtension: "cpp" | "py" | "bin";
  markdown?: string;
};

export type TDeploymentDeviceDetails = {
  id: string;
  type: "standalone" | "gateway" | "node";
  name: string;
  associate: TEntry[];
  alias: string;
  status: "active" | "inactive";
  battery: number;
  temperature: number;
  lastCommunuication: string;
  jwt: string;
};

export type TMessage = {
  id: string;
  createdAt: string;
  receivedAt: string;
  latitude: number;
  longitude: number;
  [x: string]: string | number | boolean;
};

export type TMapPin = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastMessage: TMessage;
};

export type TAllEntryInProject = {
  id: string;
  name: string;
  entry: TEntry[];
};

export type TDeviceFirmware = {
  [T in TFirmwareType]?: TDeviceFirmwareDetails;
};

export type TDeviceFirmwareDetails = {
  id: string;
  firmware: {
    id: string;
    name: string;
  };
  firmwareVersion: {
    id: string;
    name: string;
  };
  autoUpdate: boolean;
};

export type TDevicePosition = {
  id: string;
  name: string;
  alias: string;
  latitude: number;
  longitude: number;
  battery: number;
  temperature: number;
  lastConnection: string;
  type: "standalone" | "gateway" | "node";
  associate: TEntry[];
};

export type TArea = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  coordinates: [number, number][];
  alert: number;
};

export type TDevicePath = {
  id: string;
  name: string;
  alias: string;
  path: {
    id: string;
    createdAt: string;
    latitude: number;
    longitude: number;
  }[];
};

export type TCustomMarker = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  devicePhaseId?: string;
  devicePhaseName?: string;
  deviceName?: string;
  deviceType?: "standalone" | "gateway" | "node";
};

export type TDeviceStats =
  | {
      isEnough: false;
      x?: never;
      y?: never;
      change?: never;
      sign?: never;
      current?: number;
    }
  | {
      isEnough: true;
      x: string[];
      y: (number | null)[];
      change: number;
      sign: "positive" | "negative";
      current: number;
    };

export type TDashboardStats = {
  gateway: {
    active: number;
    total: number;
  };
  standalone: {
    active: number;
    total: number;
  };
  node: {
    active: number;
    total: number;
  };
  messagePerMinute: number;
};

export type TDashboardBattery = {
  id: string;
  alias: string;
  battery: number;
};

export type TDashboardLastConnection = {
  id: string;
  alias: string;
  lastConnection: string;
};
