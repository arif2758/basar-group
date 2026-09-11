"use client";

import React from "react";
import AdminUsersDoubleLayerTable, {
  IAdminUserItem,
  IUserFamilyRequest,
} from "@/components/admin/users/AdminUsersDoubleLayerTable";

export type IUserFamilySyncItem = IAdminUserItem;

interface UserFamilySyncTableProps {
  users: IUserFamilySyncItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onToggleStatus: (userId: string, nextStatus: boolean, genId?: string) => Promise<void>;
  onUpdateGenId: (userId: string, newGenId: string) => Promise<void>;
  onUpdateRole?: (userId: string, newRole: string) => Promise<void>;
  onUpdateAccountType?: (userId: string, newType: string) => Promise<void>;
  onDeleteUser?: (userId: string) => Promise<void>;
}

export default function UserFamilySyncTable({
  users,
  isLoading,
  onRefresh,
  onToggleStatus,
  onUpdateGenId,
  onUpdateRole,
  onUpdateAccountType,
  onDeleteUser,
}: UserFamilySyncTableProps) {
  return (
    <AdminUsersDoubleLayerTable
      users={users}
      isLoading={isLoading}
      onRefresh={onRefresh}
      onToggleFamilyStatus={onToggleStatus}
      onUpdateGenId={onUpdateGenId}
      onUpdateRole={onUpdateRole}
      onUpdateAccountType={onUpdateAccountType}
      onDeleteUser={onDeleteUser}
      mode="family-tree"
    />
  );
}
