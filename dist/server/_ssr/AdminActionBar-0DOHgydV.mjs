import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { aH as AdminButton, c as cn } from "./router-CgbkQim6.mjs";
function AdminActionBar({ actions, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-wrap items-center gap-2", className), children: actions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    AdminButton,
    {
      variant: action.variant ?? "outline",
      size: action.size ?? "md",
      onClick: action.onClick,
      disabled: action.disabled,
      loading: action.loading,
      ariaLabel: action.ariaLabel,
      icon: action.icon,
      className: "w-full sm:w-auto",
      children: action.label
    },
    action.label
  )) });
}
export {
  AdminActionBar as A
};
