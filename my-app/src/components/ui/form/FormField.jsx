import { useFormContext, Controller } from "react-hook-form";
import { cn } from "../../../utils/cn";
import { buildFieldRules } from "../../../utils/validations";
import { InfoIcon } from "../icons";

function FormFieldRoot({
  name,
  field,
  disabled = false,
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
    <FormField.Container className={className} style={{ position: "relative" }}>
      <FormField.Label required={field.required} className={labelClassName}>
        {field.label}
      </FormField.Label>

      {field.type === "text" && (
        <FormField.Input
          name={name}
          register={register}
          rules={rules}
          validator={field?.validator}
          disabled={disabled}
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
          className={controlClassName}
        />
      )}

      {
        error &&
        <FormField.Error className="text-[9px]">
          <span className="ml-[1px] flex flex-row gap-x-1 items-center justify-between">

            <InfoIcon size={9} className="text-red" />
            {error
            }
          </span>
        </FormField.Error>
      }


    </FormField.Container>
  );
}

function FormFieldContainer({ children, className = "" }) {
  return (
    <div className={cn("flex flex-col gap-.2 text-left", className)}>
      {children}
    </div>
  );
}

function FormFieldLabel({ children, required = false, className = "" }) {
  return (
    <label className={cn("text-[14px] font-md text-heading pl-[2px]", className)}>
      {children}
      {required && <span className="ml-0.5 text-primary">*</span>}
    </label>
  );
}

const controlBase = [
  "w-full rounded border bg-background px-3 py-2 text-sm text-foreground",
  "outline-none  focus:ring-1 focus:ring-white-50/30",
  "disabled:cursor-not-allowed disabled:opacity-50",
];

const controlState = (hasError) =>
  hasError
    ? "border-red-500 focus:border-red-500"
    : "border-border focus:border-primary";

function FormFieldInput({
  name,
  register,
  rules,
  disabled,
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
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cn(
        controlBase,
        "text-neutral-800 dark:text-neutral-300  h-9 text-[12px] font-0 bg-background ",
        controlState(hasError),
        className
      )}
      {...register(name, rules)}
      {...props}
    />
  );
}

function FormFieldSelect({
  name,
  control,
  rules,
  options = [],
  disabled,
  hasError,
  placeholder = "Select an option",
  className = "",
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <select
          {...field}
          disabled={disabled}
          className={cn(
            controlBase,
            "cursor-pointer",
            controlState(hasError),
            className
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    />
  );
}

function FormFieldRadioGroup({
  name,
  control,
  rules,
  options = [],
  disabled,
  className = "",
  optionClassName = "",
}) {
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
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                optionClassName
              )}
            >
              <input
                type="radio"
                value={opt.value}
                checked={field.value === opt.value}
                onChange={() => field.onChange(opt.value)}
                disabled={disabled}
                className="h-4 w-4 accent-primary"
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
