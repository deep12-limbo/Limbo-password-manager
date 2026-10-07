import { useState } from 'react'
import { useGoogleItems, useVaultItems, DynamicForm } from '@pm/shared'
import { useItemManager } from './itemManagerContext';
const BOX_CLASS = "w-full h-[400px] p-5 border border-gray-100  shadow-sm overflow-y-auto ml-1";

function DetailField({ field, value }) {
    const [visible, setVisible] = useState(false);
    const isSecret = field.key === "password";

    return (
        <div>
            <div className='text-xs text-gray-400'>{field.label}</div>
            <div className='flex items-center gap-2 text-sm break-all'>
                <span>{isSecret && !visible ? "••••••••" : (value || "—")}</span>
                {isSecret && value && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className='text-xs text-blue-600 shrink-0'
                    >
                        {visible ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function Item() {
    const { activeTab, selectedItem, mode, openEdit, closeAll } = useItemManager();

    const google = useGoogleItems();
    const vault = useVaultItems();



    const isGoogle = activeTab === "google";
    const source = isGoogle ? google : vault;
    const { create, edit, listconfig, deleteItem, formHttp: http } = source;

    // console.log(source?.create?.formConfig);


    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    if (mode === "idle" || (mode === "view" && !selectedItem)) {
        return (
            <div className={`${BOX_CLASS} flex items-center justify-center text-sm text-gray-400`}>
                Select an item, or add a new one.
            </div>
        );
    }

    if (mode === "create") {
        return (
            <div className={BOX_CLASS}>
                <h3 className='font-semibold mb-4'>
                    Add {isGoogle ? "Google login" : "password"}
                </h3>
                <DynamicForm
                    // step = {}
                    id="create-form"
                    className="border-none bg-transparent p-0"
                    fieldsWrapperClassName="flex flex-col gap-5"
                    step={create.formConfig}
                    defaultValues={create.defaultValues}
                    loading={http?.isLoading}
                    error={http?.error}
                    submitLabel="Save"
                    onCancel={closeAll}
                    showSubmit={true}
                    onSubmit={async (values) => {
                        const ok = await create.onSubmit(values);
                        if (ok) closeAll();
                    }}
                    submitClassName="w-full mt-6 p-2"
                    submitVariant="primary"
                />
                {/* <Button.Root
                    type="submit"
                    form="create-form"

                    disabled={http.isLoading}
                    className="mt-4 w-full"
                    isLoading={http.isLoading}
                // onClick={async (values) => {
                //     // const ok = await create.onSubmit(values);
                //     // if (ok) closeAll();
                //     return
                // }}
                >
                    <Button.Text>
                        {http.isLoading
                            ? "Saving..."
                            : "Save"}
                    </Button.Text>
                </Button.Root> */}

                {/* Error */}
                {http.error && (
                    <p className="mt-2 text-sm text-red-500">
                        {http.error}
                    </p>
                )}

            </div>
        );
    }

    if (mode === "edit" && selectedItem) {
        return (
            <div className={BOX_CLASS}>
                <h3 className='font-semibold mb-4'>
                    Edit {isGoogle ? "Google login" : "password"}
                </h3>
                <DynamicForm
                    id="edit-form"
                    step={edit.formConfig}
                    defaultValues={edit.getDefaultValues(selectedItem)}
                    loading={http?.isLoading}
                    error={http?.error}
                    // submitLabel="Update"
                    onCancel={closeAll}
                    onSubmit={async (values) => {
                        const ok = await edit.onSubmit(selectedItem, values);
                        if (ok) closeAll();
                    }}
                    showSubmit={true}
                    submitClassName="w-full mt-6 p-2"
                    submitVariant="primary"
                    className="border-none bg-transparent p-0"
                    fieldsWrapperClassName="flex flex-col gap-5"
                />
                {/* <Button.Root
                    type="submit"
                    form="edit-form"

                    disabled={http.isLoading}
                    className="mt-4 w-full"
                    isLoading={http.isLoading}
                // onClick={async (values) => {
                //     const ok = await edit.onSubmit(selectedItem, values);
                //     if (ok) closeAll();
                // }}
                >
                    <Button.Text>
                        {http.isLoading
                            ? "Saving..."
                            : "Save"}
                    </Button.Text>
                </Button.Root> */}

                {/* Error */}
                {http.error && (
                    <p className="mt-2 text-sm text-red-500">
                        {http.error}
                    </p>
                )}
            </div>
        );
    }

    // mode === "view"
    const handleDelete = async () => {
        setDeleting(true);
        setDeleteError(null);

        const ok = await deleteItem(selectedItem.id);

        setDeleting(false);

        if (ok) {
            closeAll();
        } else {
            setDeleteError("Failed to delete. Try again.");
        }
    };

    return (
        <div className={BOX_CLASS}>
            <h3 className='font-semibold mb-4 truncate'>{selectedItem.name}</h3>

            <div className='flex flex-col gap-3'>
                {listconfig.detailFields.map((field) => (
                    <DetailField
                        key={field.key}
                        field={field}
                        value={selectedItem[field.key]}
                    />
                ))}
            </div>

            {deleteError && (
                <p className='text-sm text-red-500 mt-3'>{deleteError}</p>
            )}

            <div className='flex gap-2 mt-5'>
                <button
                    type="button"
                    onClick={() => openEdit(selectedItem)}
                    className='flex-1 rounded-md border border-gray-200 py-2 text-sm hover:bg-gray-50 transition-colors'
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className='flex-1 rounded-md bg-red-500 text-white py-2 text-sm hover:bg-red-600 disabled:opacity-60 transition-colors'
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}
