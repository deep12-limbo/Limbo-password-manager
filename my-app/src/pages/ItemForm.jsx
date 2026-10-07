
import DynamicForm from "../components/ui/form/DynamicForm";
import Button from "../components/ui/Button";
import { cn } from "../utils/cn";
import { useState } from "react";


export default function ItemForm({
    item = null,

    /*
     * Complete hook data coming from ItemsManager.
     */
    hookData,

    isEditMode = false,

    /*
     * If ItemForm is rendered inside a modal,
     * close the modal after successful submit.
     */
    closeModal = null,

    /*
     * Custom styling classes.
     */
    className = "",
    headingClassName = "",
    titleClassName = "text-[14px] font-semibold text-start",
    formClassName = "",
    buttonClassName = "",
    errorClassName = "",


    labelClassName = "",
    controlClassName = "",
    //   errorClassName = "",

    //  dynamic form classes 
    FormclassName = "border-0 p-0",
    fieldsWrapperClassName = "",
    fieldClassName = "",

    showSubmit = true,
    submitLabel = "Save",
    submitClassName = "",
    submitVariant = "primary",
    submitSize = "md",
    onlyDirtyFields,
    //   closeModal,


    // customSubmitButton = null




}) {

    /*
     * Pick the correct part of hookData.
     */
    const formData = isEditMode
        ? hookData?.edit
        : hookData.create;


    /*
     * Common form configuration.
     */
    const {
        formConfig,
    } = formData;


    /*
     * Default values.
     */
    const defaultValues = isEditMode
        ? formData.getDefaultValues(item)
        : formData.defaultValues;


    /*
     * Submit function.
     */
    const onSubmit = isEditMode
        ? (formDataValue) =>
            formData.onSubmit(
                item,
                formDataValue
            )
        : formData.onSubmit;


    /*
     * Shared HTTP state.
     */
    const {
        http,
    } = hookData;


    /*
     * UI configuration.
     */
    const mode = isEditMode
        ? "update"
        : "create";

    const ui = formConfig.ui[mode];



    /*
     * Form ID.
     */
    const formId = "google-form";

    console.log("formclassname", FormclassName)

    const [resetTrigger, setResetTrigger] = useState(0);

    return (
        <div className={cn("", className)}>

            {/* Heading */}
            <div className={cn("mb-1", headingClassName)}>
                <h1 className={cn("text-lg font-bold border-dashed  border-b-1 border-border pb-2 mt-2 ", titleClassName)}>
                    {ui?.title}
                </h1>
            </div>


            {/* Dynamic form */}
            <DynamicForm
                step={formConfig}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                formId={formId}
                disabled={http.isLoading}
                showSubmit={false}
                closeModal={closeModal}
                onlyDirtyFields={isEditMode}
                className={cn(formClassName)}

                FormclassName={FormclassName}
                fieldsWrapperClassName={cn(mode == "update " || mode == "create" ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" : "", fieldsWrapperClassName)}
                fieldClassName={fieldClassName}

                //   showSubmit = {showSubmit}
                submitLabel={submitLabel}
                submitClassName={submitClassName}
                submitVariant={submitVariant}
                submitSize={submitSize}
                //   onlyDirtyFields = { onlyDirtyFields}
                //   closeModal
                resetTrigger={resetTrigger}

                controlClassName={controlClassName}
                errorClassName={errorClassName}
            />


            {/* Submit button */}


            <div className="w-full border-dashed border-t-1 border-border mt-5 ">
                {
                    mode == "update" && (
                        <div className="flex w-full justify-end gap-x-4 h-8 mt-3">

                            <Button.Root
                                type="button"
                                form={formId}
                                onClick={() => setResetTrigger(prev => prev + 1)}
                                disabled={http.isLoading}
                                className={cn("shadwo-sm hover:shadow-md",
                                    "w-[30%] rounded-sm px-3 ",
                                    "transition-all duration-200 ease-out",
                                    "hover:shadow-sm hover:-translate-y-[1px]",
                                    "active:translate-y-0 active:scale-[0.99]", buttonClassName)}
                                // isLoading={http.isLoading}
                                variant="ghost"

                            >
                                <Button.Text>
                                    Reset
                                </Button.Text>
                            </Button.Root>
                            <Button.Root
                                type="submit"
                                form={formId}
                                disabled={http.isLoading}
                                className={cn("shadwo-sm hover:shadow-md",
                                    "w-[30%] rounded-sm px-3 ",
                                    "transition-all duration-200 ease-out",
                                    "hover:shadow-sm hover:-translate-y-[1px]",
                                    "active:translate-y-0 active:scale-[0.99]", buttonClassName)}
                                isLoading={http.isLoading}
                            >
                                <Button.Text>
                                    {http.isLoading
                                        ? ui?.loadingText
                                        : "save"}
                                </Button.Text>
                            </Button.Root>



                        </div>

                    )
                }
                {
                    mode == "create" && (
                        <div className="flex w-full justify-end gap-x-4 h-8 mt-5">

                            <Button.Root
                                type="button"
                                form={formId}
                                onClick={() => setResetTrigger(prev => prev + 1)}
                                disabled={http.isLoading}
                                className={cn("shadwo-sm hover:shadow-md",
                                    "w-[30%] rounded-sm px-3 ",
                                    "transition-all duration-200 ease-out",
                                    "hover:shadow-sm hover:-translate-y-[1px]",
                                    "active:translate-y-0 active:scale-[0.99]", buttonClassName)}
                                // isLoading={http.isLoading}
                                variant="ghost"

                            >
                                <Button.Text>
                                    Reset
                                </Button.Text>
                            </Button.Root>
                            <Button.Root
                                type="submit"
                                form={formId}
                                disabled={http.isLoading}
                                className={cn("shadwo-sm hover:shadow-md",
                                    "w-[30%] rounded-sm px-3 ",
                                    "transition-all duration-200 ease-out",
                                    "hover:shadow-sm hover:-translate-y-[1px]",
                                    "active:translate-y-0 active:scale-[0.99]", buttonClassName)}
                                isLoading={http.isLoading}
                            >
                                <Button.Text>
                                    {http.isLoading
                                        ? ui?.loadingText
                                        : "save"}
                                </Button.Text>
                            </Button.Root>



                        </div>

                    )
                }

                {
                    mode != "create" && mode != "update" &&
                    <Button.Root


                        type="submit"
                        form={formId}
                        disabled={http.isLoading}
                        className={cn("mt-5", buttonClassName)}
                        isLoading={http.isLoading}
                    >
                        <Button.Text>
                            {http.isLoading
                                ? ui?.loadingText
                                : ui?.submitText}
                        </Button.Text>

                    </Button.Root>
                }


            </div>
            {/* Server/API error */}
            {http.error && (
                <p className={cn("", errorClassName)}>
                    {http.error}
                </p>
            )}

        </div>
    );
}

