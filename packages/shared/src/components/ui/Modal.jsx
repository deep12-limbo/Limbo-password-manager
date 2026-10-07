import { cn } from "../../utils/cn";
import { CloseIcon } from "./icons";
import Button from "./Button.jsx";
import { useEffect } from "react";

export default function Modal({
  open,
  setOpen,
  title,
  message,
  confirmLabel = "Leave",
  cancelLabel = "Stay",
  onConfirm,
  onCancel,
  children,
}) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);
  return (



    <Modal.Root open={open}>



      <Modal.Overlay onClick={onCancel} />

      <Modal.Container>
        <Modal.Close onClick={onCancel} />

        {title && <Modal.Title>{title}</Modal.Title>}

        {children ? (
          children
        ) : (
          <>
            <Modal.Message>{message}</Modal.Message>

            <Modal.Actions>
              <Button.Root variant="outline" size="sm" onClick={onCancel}>
                <Button.Text>{cancelLabel}</Button.Text>
              </Button.Root>

              <Button.Root variant="danger" size="sm" onClick={() => {
                console.log("clicked  modal root")
                setOpen(false);
                onConfirm();
              }}>
                <Button.Text>{confirmLabel}</Button.Text>
              </Button.Root>
            </Modal.Actions>
          </>
        )}
      </Modal.Container>
    </Modal.Root>


  );
}

function ModalRoot({ open, children, onCancel, className = "" }) {
  if (!open) return null;

  return (

    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function ModalOverlay({ onClick, className = "" }) {
  return (
    <div
      className={cn("absolute inset-0 bg-black/40", className)}
      onClick={onClick}
    />
  );
}

function ModalContainer({ children, className = "" }) {
  return (
    <div
      className={cn(
        "relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        "rounded-xl border border-border bg-background p-6 shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function ModalClose({ onClick, className = "" }) {
  if (!onClick) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={cn(
        "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full",
        "text-foreground/50 transition-colors hover:bg-surface-hover hover:text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        "[&>svg]:h-4 [&>svg]:w-4",
        className
      )}
    >
      <CloseIcon />
    </button>
  );
}

function ModalTitle({ children, className = "" }) {
  return (
    <h3 className={cn("pr-8 text-lg font-semibold text-heading", className)}>
      {children}
    </h3>
  );
}

function ModalMessage({ children, className = "" }) {
  return (
    <p className={cn("mt-2 text-sm text-foreground/70", className)}>
      {children}
    </p>
  );
}

function ModalActions({ children, className = "" }) {
  return (
    <div className={cn("mt-6 flex justify-end gap-3", className)}>
      {children}
    </div>
  );
}

Modal.Root = ModalRoot;
Modal.Overlay = ModalOverlay;
Modal.Container = ModalContainer;
Modal.Close = ModalClose;
Modal.Title = ModalTitle;
Modal.Message = ModalMessage;
Modal.Actions = ModalActions;