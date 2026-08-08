import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AdminButton, type AdminButtonSize, type AdminButtonVariant } from "./AdminButton";

export type AdminAction = {
  label: string;
  icon?: ReactNode;
  variant?: AdminButtonVariant;
  size?: AdminButtonSize;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
};

interface AdminActionBarProps {
  actions: AdminAction[];
  className?: string;
}

export function AdminActionBar({ actions, className }: AdminActionBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {actions.map((action) => (
        <AdminButton
          key={action.label}
          variant={action.variant ?? "outline"}
          size={action.size ?? "md"}
          onClick={action.onClick}
          disabled={action.disabled}
          loading={action.loading}
          ariaLabel={action.ariaLabel}
          icon={action.icon}
          className="w-full sm:w-auto"
        >
          {action.label}
        </AdminButton>
      ))}
    </div>
  );
}
