import { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { cn } from "../../../utils/cn";
import FormField from "./FormField";
import Button from "../Button";

function isFieldEnabled(field, values) {
  if (!field.dependsOn) return true;
  const { field: key, value } = field.dependsOn;
  return values[key] === value;
}

export default function DynamicForm({
  // ── form data / config ──────────────────────────────
  step, // config to render fields dynamically, for example look for the file vault-item-config.js inside packages/shared/src/utils/config/ and look for the vaultFormConfig object, this is the config that is used to generate the form fields dynamically, and it is passed as a prop to the DynamicForm component. The step prop is an object that contains the form configuration, including the fields, their types, labels, and other properties. The DynamicForm component uses this configuration to render the form fields dynamically based on the provided config.
  defaultValues,
  formId = "dynamic-form",
  resetTrigger = 0,

  // ── form behavior ────────────────────────────────────
  onSubmit,
  disabled = false,
  readOnly = false,
  onlyDirtyFields,
  serverErrors = null,
  closeModal,

  // ── submit button ────────────────────────────────────
  showSubmit = true,
  submitLabel = "Save",
  submitVariant = "primary",
  submitSize = "md",
  submitClassName = "",

  // ── styling / layout ─────────────────────────────────
  FormclassName = "",
  fieldsWrapperClassName = "",
  fieldClassName = "",
  labelClassName = "text-[12px]",
  controlClassName = "",
  errorClassName = "",
}) {
  const methods = useForm({ defaultValues, mode: "onBlur" });
  const { handleSubmit, reset, control, setError, formState } = methods;
  const watchedValues = useWatch({ control });

  useEffect(() => {
    reset(defaultValues);
  }, [resetTrigger]);

  useEffect(() => {
    reset(defaultValues);
  }, [step?.step]);

  useEffect(() => {
    if (!serverErrors) return;
    Object.entries(serverErrors).forEach(([key, message]) => {
      setError(key, { type: "server", message });
    });
  }, [serverErrors, setError]);

  if (!step) return null;

  const handleFormSubmit = (data) => {
    if (!onlyDirtyFields) {
      closeModal();
      return onSubmit(data);
    }

    const dirtyKeys = Object.keys(formState.dirtyFields);

    const changed = dirtyKeys.reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    return onSubmit(changed);
  };

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        onSubmit={handleSubmit(async (formData) => {
          const success = await onSubmit(formData);

          if (success && closeModal) {
            closeModal();
          }
        })}
        noValidate
        className={cn(
          "w-full rounded border border-border  p-6",
          FormclassName
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-4",
            fieldsWrapperClassName
          )}
        >
          {step?.fields?.map((field) => {
            const enabled = isFieldEnabled(field, watchedValues);

            return (
              <div
                key={field.fieldKey}
                className={cn(field.className, fieldClassName)}
              >
                <FormField.Root
                  name={field.fieldKey}
                  field={field}
                  disabled={disabled || !enabled}
                  readOnly={readOnly}
                  labelClassName={labelClassName}
                  controlClassName={controlClassName}
                  errorClassName={errorClassName}
                />
              </div>
            );
          })}
        </div>

        {showSubmit && (
          <Button.Root
            type="submit"
            variant={submitVariant}
            size={submitSize}
            disabled={disabled || formState.isSubmitting}
            className={cn("mt-6 ", submitClassName)}
          >
            <Button.Text>{submitLabel}</Button.Text>
          </Button.Root>
        )}
      </form>
    </FormProvider>
  );
}