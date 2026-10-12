import DynamicForm from "../components/ui/form/DynamicForm";
import Button from "../components/ui/Button";
import { cn } from "../utils/cn";
import { useState } from "react";
import { ModalClose } from "../components/ui/Modal";
import { CloseIcon, DeleteIcon, ResetIcon, SaveIcon, UpdateIcon } from "../components/ui/icons";
import { useLocation } from "react-router-dom";
import ROUTES from "../routers/routespath";
import Spinner from "../components/ui/Spinner";

/*
 * Action-button HOCs — width, shape, and transitions live here
 * once; each wraps Button with a fixed shared look, only
 * variant/color differs per button type.
 */

function withActionButton({ variant, extraClassName = "", iconHOC }) {
    return function ActionButton({
        className = "",
        children,
        icon,
        isLoading,
        ...rest
    }) {
        return (
            <Button.Root
                variant={variant}
                className={cn(
                    "w-12 shrink-0 justify-center rounded-sm px-0",
                    "min-[420px]:w-20 min-[420px]:px-3",
                    "sm:w-24 md:w-28",

                    "transition-all duration-200 ease-out",
                    "disabled:opacity-40 disabled:pointer-events-none",

                    extraClassName,
                    className,

                    "h-7 py-2",
                    "text-[13px]"
                )}
                {...rest}
                icon={icon}
            >
                {!isLoading ?
                    <>
                        <Button.Text className="hidden min-[420px]:inline">
                            {children}
                        </Button.Text>

                        <Button.Icon>
                            {icon ? icon : iconHOC}
                        </Button.Icon> </> : <Spinner />}
            </Button.Root>
        );
    };
}

const SaveButton = withActionButton({
    extraClassName:
        "shadow-sm hover:shadow-md   active:translate-y-0 active:scale-[0.99]",
});

const ResetButton = withActionButton({
    variant: "ghost",
    extraClassName:
        "bg-surface-hover opacity-80 hover:opacity-100",
    iconHOC: <ResetIcon size={15} />
});

const DeleteButton = withActionButton({
    variant: "ghost",
    extraClassName: "text-danger bg-danger/10  ",
    iconHOC: <DeleteIcon size={15} />
});


/*
 * Shared Reset + Save action row — used in create mode and
 * edit mode (while actively editing).
 */
function FormActions({ formId, onReset, isLoading, loadingText, buttonClassName, isDirty }) {
    return (
        <div className="flex w-full justify-end items-center gap-x-4 h-8 ">
            <ResetButton
                type="button"
                form={formId}
                onClick={onReset}
                disabled={isLoading || !isDirty}
                className={buttonClassName}
            >
                Reset
            </ResetButton>

            <SaveButton
                type="submit"
                form={formId}
                disabled={isLoading}
                isLoading={isLoading}
                className={buttonClassName}
                icon={<SaveIcon size={15} />}

            >
                {/* <SaveIcon/> */}
                {isLoading ? "" : "Save"}
            </SaveButton>
        </div>
    );
}


function UpdateActions({
    formId,
    isReadOnly,
    onToggleEdit,
    onReset,
    isSaving,
    loadingText,
    onDelete,
    isDeleting,
    buttonClassName,
    isDirty,
}) {
    const isEditing = !isReadOnly;

    return (
        <div

            className={cn(
                "flex  flex-row items-center justify-between gap-3",
                // "sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-0",

            )}
        >

            <DeleteButton
                type="button"
                onClick={onDelete}
                disabled={isEditing || isDeleting}
                isLoading={isDeleting}
                className={cn(buttonClassName,)}
            >
                Delete
            </DeleteButton>

            <div className=" sm:w-auto flex items-center justify-around gap-x-3">

                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isEditing}
                        onClick={onToggleEdit}
                        className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full",
                            "transition-colors duration-200 ease-in-out",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                            isEditing ? "bg-primary" : "bg-foreground/20"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm",
                                "transition-transform duration-200 ease-in-out",
                                isEditing ? "translate-x-[18px]" : "translate-x-[3px]"
                            )}
                        />
                    </button>

                    <span className="text-xs font-medium text-foreground/70">
                        Edit
                    </span>
                </label>

                <ResetButton
                    type="button"
                    form={formId}
                    onClick={onReset}
                    disabled={isReadOnly || isSaving || !isDirty}
                    className={buttonClassName}
                >
                    Reset
                </ResetButton>

                <SaveButton
                    type="submit"
                    form={formId}
                    disabled={isDeleting ||  isReadOnly || isSaving}
                    isLoading={isSaving}
                    className={buttonClassName}
                    icon={<UpdateIcon size={15} className="text-text" />}

                >


                    {isSaving ? "" : "Update"}
                </SaveButton>

            </div>



        </div>
    );
}



const DashedBorder = ({ className }) => {
    return (
        <div
            className={cn("border-b border-dashed border-border my-[1rem]", className,)}></div>


    )
}



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
    controlClassName = "bg-sidebar-item-hover",

    //  dynamic form classes
    FormclassName = "border-0 p-0",
    fieldsWrapperClassName = "",
    fieldClassName = "",

    submitClassName = "",
    submitVariant = "primary",
    submitSize = "md",

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
     * Submit function — wrapped so a successful edit flips
     * the form back to read-only view automatically.
     */
    const rawOnSubmit = isEditMode
        ? (formDataValue) =>
            formData.onSubmit(
                item,
                formDataValue
            )
        : formData.onSubmit;

    const onSubmit = async (formDataValue) => {
        const success = await rawOnSubmit(formDataValue);

        if (success && isEditMode) {
            setIsReadOnly(true);
        }

        return success;
    };


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
    const detailsViewTitle = formConfig?.ui?.view?.title || "";


    /*
     * Form ID.
     */
    const formId = "google-form";

    const [resetTrigger, setResetTrigger] = useState(0);
    const [isDirty, setIsDirty] = useState(false);// to disable the reset if form isn't dirty

    /*
     * View/edit toggle — lives entirely here.
     * Edit mode starts read-only (viewing); create mode is
     * always editable, there's nothing to view yet.
     */
    const [isReadOnly, setIsReadOnly] = useState(isEditMode);
    const effectiveReadOnly = isEditMode ? isReadOnly : false;

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!item?.id || !hookData?.deleteItem) return;

        setIsDeleting(true);
        const success = await hookData.deleteItem(item.id);
        setIsDeleting(false);

        if (success && closeModal) {
            closeModal();
        }
    };



    console.log("fieldsWrapperClassName", fieldsWrapperClassName)


    const location = useLocation();

    const isGoogleRoute =
        location.pathname === ROUTES.GOOGLE_ITEMS;

    const modalWidthClass = isGoogleRoute
        ? "w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%]"
        : "w-[90%] sm:w-[90%] md:w-[75%] lg:w-[70%]";

    const fieldsWrapperClass = isGoogleRoute
        ? "grid grid-cols-1 gap-4 md:grid-cols-2"
        : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";
    return (
        <div className={cn("", className)}>

            {/* Heading */}
            {/* Heading */}
            <div className={cn("w-full ", headingClassName)}>

                <div className="flex w-full items-center justify-between ">
                    <h1 className={cn(" font-semibold ", titleClassName, "text-[20px] text-heading font-inter")}>
                        {mode === "update" && isReadOnly
                            ? detailsViewTitle
                            : ui?.title}
                    </h1>

                    <button
                        type="button"
                        onClick={closeModal}
                        aria-label="Close"
                        className={cn(
                            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            "text-foreground/50 transition-colors",
                            "hover:bg-surface-hover hover:text-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-primary/40",
                            "[&>svg]:h-4 [&>svg]:w-4"
                        )}
                    >
                        <CloseIcon size={14} />
                    </button>
                </div>


            </div>
            <DashedBorder></DashedBorder>

            {/* Dynamic form */}
            <DynamicForm
                step={formConfig}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                formId={formId}
                disabled={effectiveReadOnly ? false : http.isLoading}
                showSubmit={false}
                closeModal={closeModal}
                onlyDirtyFields={isEditMode}
                className={cn(formClassName,)}

                FormclassName={FormclassName}
                fieldsWrapperClassName={cn(

                    fieldsWrapperClass,

                )}
                fieldClassName={fieldClassName}

                submitClassName={submitClassName}
                submitVariant={submitVariant}
                submitSize={submitSize}
                resetTrigger={resetTrigger}

                labelClassName={labelClassName}
                controlClassName={controlClassName}
                errorClassName={errorClassName}
                readOnly={effectiveReadOnly}

                onDirtyChange={setIsDirty}

            />

            <DashedBorder></DashedBorder>

            {/* Actions */}
            {mode === "create" && (
                // <div className="w-full border-dashed border-t-1 border-border  ">
                <FormActions
                    formId={formId}
                    onReset={() => setResetTrigger((prev) => prev + 1)}
                    isLoading={http.isLoading}
                    loadingText={ui?.loadingText}
                    buttonClassName={buttonClassName}
                    isDirty={isDirty}
                />
                // </div>
            )}

            {mode === "update" && (
                // <div className="w-full border-dashed border-t-1 border-border ">
                <UpdateActions
                    formId={formId}
                    isReadOnly={effectiveReadOnly}
                    onToggleEdit={() => setIsReadOnly((prev) => !prev)}
                    onReset={() => setResetTrigger((prev) => prev + 1)}
                    isSaving={http.isLoading}
                    loadingText={ui?.loadingText}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    buttonClassName={buttonClassName}
                    isDirty={isDirty}
                />
                // </div>
            )}

            {mode !== "create" && mode !== "update" && (
                <Button.Root
                    type="submit"
                    form={formId}
                    disabled={http.isLoading}
                    isLoading={http.isLoading}
                    className={cn("", buttonClassName)}
                >
                    <Button.Text>
                        {http.isLoading ? ui?.loadingText : ui?.submitText}
                    </Button.Text>
                </Button.Root>
            )}

            {/* Server/API error */}
            {http.error && (
                <p className={cn("", errorClassName)}>
                    {http.error}
                </p>
            )}

        </div>
    );
}