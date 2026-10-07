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
  step, // config to render feilds dynamically, for example look for the file vault-item-config.js inside packages/shared/src/utils/config/ and look for the vaultFormConfig object, this is the config that is used to generate the form fields dynamically, and it is passed as a prop to the DynamicForm component. The step prop is an object that contains the form configuration, including the fields, their types, labels, and other properties. The DynamicForm component uses this configuration to render the form fields dynamically based on the provided config.
  defaultValues,
  disabled = false,
  onSubmit,
  formId = "dynamic-form",
  serverErrors = null,

  FormclassName = "",
  fieldsWrapperClassName = "",
  fieldClassName = "",


  showSubmit = true,
  submitLabel = "Save",
  submitClassName = "",
  submitVariant = "primary",
  submitSize = "md",
  onlyDirtyFields,
  closeModal,

  // formfield classnames
  labelClassName = "text-[12px]",
  controlClassName = "",
  errorClassName = "",

  resetTrigger = 0



}) {
  const methods = useForm({ defaultValues, mode: "onBlur" });
  const { handleSubmit, reset, control, setError, formState } = methods;
  const watchedValues = useWatch({ control });

  console.log("restetriger value", resetTrigger)
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
      closeModal()
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
          "w-full rounded border border-border bg-background p-6",
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
            // size="s"
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