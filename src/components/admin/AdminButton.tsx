import { Loader2 } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AdminButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning";

export type AdminButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<AdminButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg hover:shadow-primary/20 focus-visible:ring-ring",
  secondary:
    "border border-border bg-card text-primary shadow-sm hover:-translate-y-0.5 hover:border-primary/25 hover:bg-secondary hover:shadow-md focus-visible:ring-ring",
  outline:
    "border border-border bg-card text-primary shadow-sm hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:shadow-md focus-visible:ring-ring",
  ghost: "bg-transparent text-primary hover:bg-secondary hover:text-ocean focus-visible:ring-ring",
  danger:
    "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/20 hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20 focus-visible:ring-destructive",
  success:
    "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 focus-visible:ring-emerald-500",
  warning:
    "bg-accent text-accent-foreground shadow-sm shadow-accent/20 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 focus-visible:ring-accent",
};

const sizeClasses: Record<AdminButtonSize, string> = {
  sm: "h-9 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-md",
  lg: "h-12 px-5 text-sm gap-2 rounded-lg",
  icon: "size-10 rounded-md p-0",
};

export function adminButtonClasses(
  variant: AdminButtonVariant = "primary",
  size: AdminButtonSize = "md",
  extra?: string,
) {
  return cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    variantClasses[variant],
    sizeClasses[size],
    extra,
  );
}

export interface AdminButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: AdminButtonVariant;
  size?: AdminButtonSize;
  loading?: boolean;
  ariaLabel?: string;
  icon?: ReactNode;
}

export function AdminButton({
  variant = "primary",
  size = "md",
  loading = false,
  ariaLabel,
  icon,
  children,
  className,
  disabled,
  ...props
}: AdminButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      {...props}
      className={adminButtonClasses(variant, size, className)}
    >
      {loading ? (
        <Loader2
          className={cn("shrink-0 animate-spin", size === "sm" ? "size-3.5" : "size-4")}
          aria-hidden="true"
        />
      ) : (
        icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
      )}
      {children}
    </button>
  );
}
