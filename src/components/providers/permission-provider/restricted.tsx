"use client";
import React from "react";
import { TPermission } from "@/lib/type";
import usePermission from "./use-permission";

type Props = {
  to: TPermission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

// This component is meant to be used everywhere a restriction based on user permission is needed
const Restricted: React.FunctionComponent<Props> = ({
  to,
  fallback,
  children,
}) => {
  // We "connect" to the provider thanks to the permission hook
  const allowed = usePermission(to);

  // If the user has that permission, render the children
  if (allowed) {
    return <>{children}</>;
  }

  // Otherwise, render the fallback
  return <>{fallback}</>;
};

export default Restricted;
