const iconProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

function HomeIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m3 10 9-7 9 7" />
            <path d="M5 9v12h14V9" />
            <path d="M9 21v-7h6v7" />
        </svg>
    );
}

function LoginIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M21 3v18" />
        </svg>
    );
}

function LogoutIcon({ size = 15, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
        </svg>
    );
}

function SignupIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
            <path d="M19 8v6" />
            <path d="M16 11h6" />
        </svg>
    );
}

function UserIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
    );
}

function SettingsIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-2.8v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4v-2.8h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3h2.8v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V12h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
    );
}

function MenuIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
        </svg>
    );
}

function CreateIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}

function EditIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </svg>
    );
}

function DeleteIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 15H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
        </svg>
    );
}

function ViewIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function CopyIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

function MoreIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
        </svg>
    );
}

function CloseIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
        </svg>
    );
}

function CheckIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function SearchIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
        </svg>
    );
}

function FilterIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M4 5h16" />
            <path d="M7 12h10" />
            <path d="M10 19h4" />
        </svg>
    );
}

function ClearSearchIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="11" cy="11" r="7" />
            <path d="m8.5 8.5 5 5" />
            <path d="m13.5 8.5-5 5" />
            <path d="m20 20-4-4" />
        </svg>
    );
}

function ChevronLeftIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRightIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

function ChevronsLeftIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m11 17-5-5 5-5" />
            <path d="m18 17-5-5 5-5" />
        </svg>
    );
}

function ChevronsRightIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m13 17 5-5-5-5" />
            <path d="m6 17 5-5-5-5" />
        </svg>
    );
}

function EyeIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="m3 3 18 18" />
            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
            <path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c6.5 0 10 8 10 8a18.3 18.3 0 0 1-3.1 4.3" />
            <path d="M6.6 6.6C3.8 8.6 2 12 2 12s3.5 8 10 8c1.5 0 2.8-.3 4-.8" />
        </svg>
    );
}

function LockIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

function UnlockIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 7.5-2" />
        </svg>
    );
}

function KeyIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="8" cy="15" r="4" />
            <path d="m11 12 9-9" />
            <path d="m17 6 2 2" />
            <path d="m14 9 2 2" />
        </svg>
    );
}

function ShieldIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function RefreshIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M20 11a8.1 8.1 0 0 0-14.8-4L3 10" />
            <path d="M3 4v6h6" />
            <path d="M4 13a8.1 8.1 0 0 0 14.8 4L21 14" />
            <path d="M21 20v-6h-6" />
        </svg>
    );
}

function LoadingIcon({ size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`animate-spin ${className}`}
            {...iconProps}
        >
            <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" />
        </svg>
    );
}

function CheckCircleIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 2.5 2.5L16 9" />
        </svg>
    );
}

function ErrorCircleIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
        </svg>
    );
}

function WarningIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <path d="M10.3 4.2 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
}

function InfoIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 8h.01" />
        </svg>
    );
}





function GoogleIcon() {
    return (
        <span className="flex size-4 items-center justify-center text-sm font-bold">
            G
        </span>
    );
}

function VaultIcon({ size }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`size-${size}`}
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 9v6M9 12h6" />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
        >
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
        </svg>
    );
}
export {
    HomeIcon,
    LoginIcon,
    LogoutIcon,
    SignupIcon,
    UserIcon,
    SettingsIcon,
    MenuIcon,

    CreateIcon,
    EditIcon,
    DeleteIcon,
    ViewIcon,
    CopyIcon,
    MoreIcon,
    CloseIcon,
    CheckIcon,

    SearchIcon,
    FilterIcon,
    ClearSearchIcon,

    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,

    EyeIcon,
    EyeOffIcon,
    LockIcon,
    UnlockIcon,
    KeyIcon,
    ShieldIcon,
    RefreshIcon,

    LoadingIcon,
    CheckCircleIcon,
    ErrorCircleIcon,
    WarningIcon,
    InfoIcon,

    SunIcon,
    MoonIcon,

    GoogleIcon,
    VaultIcon,

};