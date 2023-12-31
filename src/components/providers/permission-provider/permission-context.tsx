"use client";
import React from "react";
import { TPermission } from "@/lib/type";

type PermissionContextType = {
  isAllowedTo: (permission: TPermission) => boolean;
};

// Default behaviour for the Permission Provider Context
// i.e. if for whatever reason the consumer is used outside of a provider.
// The permission will not be granted unless a provider says otherwise
const defaultBehaviour: PermissionContextType = {
  isAllowedTo: () => false,
};

// Create the context
const PermissionContext =
  React.createContext<PermissionContextType>(defaultBehaviour);

export default PermissionContext;
