"use client";
import { useContext } from "react";
import PermissionContext from "./permission-context";
import { TPermission } from "@/lib/type";

const usePermission = (permission: TPermission) => {
  const { isAllowedTo } = useContext(PermissionContext);
  return isAllowedTo(permission);
};

export default usePermission;
