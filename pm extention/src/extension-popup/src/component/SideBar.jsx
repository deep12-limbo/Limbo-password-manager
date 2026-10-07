import { useEffect } from 'react'
import Tab from './Tab'
import { cn, useGoogleItems, useVaultItems } from '@pm/shared'
import { useItemManager } from './itemManagerContext'

export function SideBar() {
    const { activeTab, selectedItem, openItem, openCreate } = useItemManager();

    const google = useGoogleItems();
    const vault = useVaultItems();

    const isGoogle = activeTab === "google";
    const source = isGoogle ? google : vault;
    const { items, fetchItems, listHttp: http } = source;



    console.log(items);

    const className = cn(
        "px-4 py-2 bg-red-500",
        "bg-blue-500 m-10"
    );

    console.log("checking cn ", className);
    useEffect(() => {
        // no pagination in this view — pull a large page once per tab
        fetchItems({ limit: 100 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    return (
        <div className='flex flex-col w-[40%] h-[400px] overflow-x-auto shadow-sm p-5'>
            <Tab />

            <button
                type="button"
                onClick={openCreate}
                className='mb-3 rounded-md bg-blue-600 text-white text-sm font-medium py-2 hover:bg-blue-700 transition-colors'
            >
                + Add {isGoogle ? "Google login" : "Password"}
            </button>

            {http?.isLoading && (
                <p className='text-sm text-gray-400'>Loading...</p>
            )}

            {http?.error && (
                <p className='text-sm text-red-500'>{http.error}</p>
            )}

            <ul className='flex flex-col gap-1 overflow-y-auto'>
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            onClick={() => openItem(item)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedItem?.id === item.id
                                ? "bg-blue-50 text-blue-700"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <div className='font-medium truncate'>{item.name}</div>
                            <div className='text-xs text-gray-400 truncate'>
                                {isGoogle ? item.email : item.username}
                            </div>
                        </button>
                    </li>
                ))}

                {!http?.isLoading && items.length === 0 && (
                    <p className='text-sm text-gray-400 mt-2'>
                        No {isGoogle ? "Google logins" : "passwords"} saved yet.
                    </p>
                )}
            </ul>
        </div>
    )
}
