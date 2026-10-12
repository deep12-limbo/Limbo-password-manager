import { useFormContext, Controller } from "react-hook-form";
import { cn } from "../../../utils/cn";
import { buildFieldRules } from "../../../utils/validations";
import { InfoIcon } from "../icons";
import { useEffect, useRef, useState } from "react";

function FormFieldRoot({
  name,
  field,
  disabled = false,
  readOnly = true,
  className = "",
  labelClassName = "",
  controlClassName = "",
  errorClassName = "text-[8px]",

}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const rules = buildFieldRules(field);
  const error = errors[name]?.message;

  return (
    <FormField.Container
      className={className}
      style={{ position: "relative" }}
    >
      <FormField.Label
        required={field.required}
        className={labelClassName}
      >
        {field.label}
      </FormField.Label>

      {field.type === "text" && (
        <FormField.Input
          name={name}
          register={register}
          rules={rules}
          validator={field?.validator}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={field?.placeholder}
          defaultValue={field?.defaultValue}
          hasError={!!error}
          className={controlClassName}
        />
      )}

      {field.type === "select" && (
        <FormField.Select
          name={name}
          control={control}
          rules={rules}
          options={field?.options}
          disabled={disabled}
          readOnly={readOnly}
          hasError={!!error}
          className={controlClassName}
        />
      )}

      {field.type === "radio" && (
        <FormField.RadioGroup
          name={name}
          control={control}
          rules={rules}
          options={field.options}
          disabled={disabled}
          readOnly={readOnly}
          className={controlClassName}
        />
      )}

      {/* Always reserve space for the error */}
      <div className="h-3">
        {error && (
          <FormField.Error className="text-[9px]">
            <span className="ml-[1px] flex flex-row items-center gap-x-1">
              <InfoIcon size={9} className="text-red" />
              {error}
            </span>
          </FormField.Error>
        )}
      </div>
    </FormField.Container>
  );
}

function FormFieldContainer({ children, className = "" }) {
  return (
    <div className={cn("flex flex-col gap-.2 text-left font-inter", className)}>
      {children}
    </div>
  );
}

function FormFieldLabel({ children, required = false, className = "" }) {
  return (
    <label className={cn("text-[14px] font-md text-heading pl-[2px]", className)}>
      {children}
      {required && <span className="ml-0.5 text-heading">*</span>}
    </label>
  );
}

const controlBase = [
  "w-full rounded border bg-background px-3 py-2 text-sm text-foreground",
  "outline-none  focus:ring-1 focus:ring-white-50/30",
  "disabled:cursor-not-allowed disabled:opacity-50",
];

const controlState = (hasError, isReadOnly) => {
  // border-dashed border-border/70 bg-surface focus:ring-0
  if (isReadOnly) {
    return "focus:ring-0 border-0 cursor-default";
  }

  return hasError
    ? "border-red-500 focus:border-red-500"
    : "border-border focus:border-primary";
};

function FormFieldInput({
  name,
  register,
  rules,
  disabled,
  readOnly,
  placeholder,
  defaultValue,
  hasError,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cn(
        controlBase,

        "text-neutral-800 dark:text-neutral-300  h-9 text-[12px] font-0 bg-background ",
        controlState(hasError, readOnly && !disabled),
        className
      )}
      {...register(name, rules)}
      {...props}
    />
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cn("h-4 w-4 shrink-0", className)}
    >
      <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FormFieldSelect({
  name,
  control,
  rules,
  options = [],
  disabled,
  readOnly,
  hasError,
  placeholder = "Select an option",
  className = "",
}) {
  const isReadOnly = readOnly && !disabled;
  const isInteractive = !disabled && !isReadOnly;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        const openDropdown = () => {
          if (!isInteractive) return;
          setHighlightedIndex(
            Math.max(0, options.findIndex((opt) => opt.value === field.value))
          );
          setIsOpen(true);
        };

        const selectOption = (value) => {
          field.onChange(value);
          setIsOpen(false);
        };

        const handleKeyDown = (e) => {
          if (!isInteractive) return;

          if (!isOpen && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
            e.preventDefault();
            openDropdown();
            return;
          }

          if (!isOpen) return;

          if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (options[highlightedIndex]) {
              selectOption(options[highlightedIndex].value);
            }
          }
        };

        return (
          <div ref={containerRef} className="relative">
            <button
              type="button"
              onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
              onBlur={field.onBlur}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              aria-readonly={isReadOnly || undefined}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={cn(
                controlBase,
                "flex items-center justify-between text-left",
                isReadOnly ? "pointer-events-none" : isInteractive ? "cursor-pointer" : "",
                controlState(hasError, isReadOnly),
                className, "h-9"
              )}
            >
              <span
                className={cn(
                  "truncate",
                  selectedOption ? "text-foreground" : "text-foreground/40"
                )}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </span>

              {!isReadOnly && (
                <ChevronDownIcon
                  className={cn(
                    "text-foreground/50 transition-transform duration-150",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </button>

            {isOpen && isInteractive && (
              <ul
                role="listbox"
                className={cn(
                  "absolute z-20 mt-1 w-full overflow-auto rounded border border-border",
                  "bg-surface shadow-lg",
                  "max-h-60 py-1"
                )}
              >
                {options.length === 0 && (
                  <li className="px-3 py-2 text-sm text-foreground/40">
                    No options
                  </li>
                )}

                {options.map((opt, index) => {
                  const isSelected = opt.value === field.value;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onMouseDown={(e) => {
                        // mousedown (not click) fires before the trigger's
                        // onBlur would otherwise close this first.
                        e.preventDefault();
                        selectOption(opt.value);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={cn(
                        "cursor-pointer px-3 py-2 text-sm truncate",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : isHighlighted
                            ? "bg-surface-hover text-foreground"
                            : "text-foreground"
                      )}
                    >
                      {opt.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      }}
    />
  );
}

function FormFieldRadioGroup({
  name,
  control,
  rules,
  options = [],
  disabled,
  readOnly,
  className = "",
  optionClassName = "",
}) {
  const isReadOnly = readOnly && !disabled;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
          {options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-2 text-sm text-foreground",
                disabled && "cursor-not-allowed opacity-50",
                isReadOnly && "cursor-default",
                !disabled && !isReadOnly && "cursor-pointer",
                optionClassName
              )}
            >
              <input
                type="radio"
                value={opt.value}
                checked={field.value === opt.value}
                onChange={() => {
                  if (isReadOnly) return;
                  field.onChange(opt.value);
                }}
                disabled={disabled}
                className={cn(
                  "h-4 w-4 accent-primary",
                  isReadOnly && "pointer-events-none"
                )}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    />
  );
}

function FormFieldError({ children, className = "" }) {

  return <div className="relative mb-1 " >

    <p className={cn("absolute top-[-0.2rem] text-[11px] text-red-500", className)}>{children}</p>

  </div>
}

const FormField = {
  Root: FormFieldRoot,
  Container: FormFieldContainer,
  Label: FormFieldLabel,
  Input: FormFieldInput,
  Select: FormFieldSelect,
  RadioGroup: FormFieldRadioGroup,
  Error: FormFieldError,
};

export default FormField;