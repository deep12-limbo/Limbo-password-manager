import { cn } from "../../../utils/cn";
import { CheckIcon } from "../icons/index";

const sizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

export default function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  size = "sm",
  label,
  className = "",
  boxClassName = "",
  labelClassName = "",
  ...props
}) {
  const isActive = checked || indeterminate;

  return (
    <label
      className={cn(
        "group inline-flex select-none items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer absolute inset-0 h-full w-full cursor-[inherit] opacity-0"
          {...props}
        />

        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center rounded-sm border border-border",
            "bg-transparent",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40",
            !disabled && "group-hover:border-primary",
            isActive && "border-primary bg-primary",
            sizes[size],
            boxClassName
          )}
        >
          {indeterminate && !checked && (
            <span className="h-0.5 w-2 rounded-full bg-primary-foreground" />
          )}

          {checked && (
            <span className="inline-flex text-primary-foreground [&>svg]:h-3 [&>svg]:w-3">
              <CheckIcon />
            </span>
          )}
        </span>
      </span>

      {label && (
        <span
          className={cn(
            "text-sm text-foreground",
            labelClassName
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}