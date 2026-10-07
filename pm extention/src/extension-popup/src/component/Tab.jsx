import { useItemManager } from './itemManagerContext'

const TABS = [
    { key: "vault", label: "Passwords" },
    { key: "google", label: "Google" },
];

export default function Tab() {
    const { activeTab, switchTab } = useItemManager();

    return (
        <div className='flex gap-2 mb-4 border-b border-gray-200'>
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    onClick={() => switchTab(tab.key)}
                    className={`px-1 py-2 text-[12px] font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.key
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
