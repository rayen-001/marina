import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/** FR / EN toggle — shows the language you can switch to. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n();
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
