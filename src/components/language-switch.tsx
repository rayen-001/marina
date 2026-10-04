import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

const LOCALES: Array<{ id: Locale; label: string; name: string }> = [
  { id: "fr", label: "FR", name: "Français" },
  { id: "en", label: "EN", name: "English" },
];

/**
 * Language switch.
 * - `compact` (default): one button showing the language you can switch to.
 * - `segmented`: FR | EN toggle with the active language highlighted (mobile header / menu).
 */
export function LanguageSwitch({
  className = "",
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "segmented";
}) {
  const { locale, setLocale } = useI18n();

  if (variant === "segmented") {
    return (
      <div
        role="group"
        aria-label="Langue / Language"
        className={cn(
          "inline-flex h-10 shrink-0 items-stretch rounded-lg border border-border bg-white p-0.5 shadow-sm",
          className,
        )}
      >
        {LOCALES.map((option) => {
          const active = option.id === locale;
          return (
            <button
              key={option.id}
              type="button"
              lang={option.id}
              aria-pressed={active}
              title={option.name}
              onClick={() => !active && setLocale(option.id)}
              className={cn(
                "flex min-w-10 flex-1 items-center justify-center rounded-md px-2.5 text-xs font-black tracking-wide transition",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-primary hover:bg-primary/5",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  const next = locale === "fr" ? "en" : "fr";
  const label = next === "en" ? "Switch to English" : "Passer en français";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      title={label}
      aria-label={label}
      lang={next}
      className={cn(
        "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-2.5 text-xs font-black uppercase tracking-wide text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5",
        className,
      )}
    >
      <Languages className="size-4 sm:hidden" />
      {next}
      <span className="normal-case sm:hidden">— {next === "en" ? "English" : "Français"}</span>
    </button>
  );
}
