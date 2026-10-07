export const vaultFormConfig = {
    step: "vault",

    ui: {
        create: {
            title: "Create Vault Item",
            description: "Save a new password vault entry.",
            submitText: "Create Vault Item",
            loadingText: "Creating...",
        },


        update: {
            title: "Edit Vault Item",
            description: "Update your vault item details.",
            submitText: "Update Vault Item",
            loadingText: "Updating...",
        },


    },

    fields: [
        {
            fieldKey: "name",
            label: "Website Name",
            type: "text",
            required: true,
            placeholder: "e.g. GitHub",
        },


        {
            fieldKey: "website",
            label: "Website",
            type: "text",
            required: false,
            placeholder: "https://github.com",
        },

        {
            fieldKey: "username",
            label: "Username",
            type: "text",
            required: false,
            placeholder: "Enter username",
        },

        {
            fieldKey: "password",
            label: "Password",
            type: "text",
            required: true,
            placeholder: "Enter password",
        },

        {
            fieldKey: "two_fa_enabled",
            label: "Enable 2FA",
            type: "radio",
            required: false,

            options: [
                {
                    label: "Yes",
                    value: true,
                },
                {
                    label: "No",
                    value: false,
                },
            ],
        },

        {
            fieldKey: "two_fa_type",
            label: "2FA Type",
            type: "select",
            required: false,

            options: [
                {
                    label: "TOTP",
                    value: "totp",
                },
            ],
            dependsOn: { field: "two_fa_enabled", value: true }
        },

        {
            fieldKey: "two_fa_email",
            label: "2FA Backup Email",
            type: "text",
            required: false,
            placeholder: "backup@example.com",
            dependsOn: { field: "two_fa_enabled", value: true },
            validations: {
                format: "email",
            },
        },

        {
            fieldKey: "two_fa_phone",
            label: "2FA Phone",
            type: "text",
            required: false,
            placeholder: "+1234567890",
            dependsOn: { field: "two_fa_enabled", value: true },

        },

        {
            fieldKey: "two_fa_secret",
            label: "2FA Secret",
            type: "text",
            required: false,
            placeholder: "Enter 2FA secret",
            dependsOn: { field: "two_fa_enabled", value: true },

        },

        {
            fieldKey: "notes",
            label: "Notes",
            type: "text",
            required: false,
            placeholder: "Personal account",
            // dependsOn: { field: "two_fa_enabled", value: true }, 
        },


    ],
};

export const vaultFormDefaultValues = {
    name: "",
    website: "",
    username: "",
    password: "",

    two_fa_enabled: false,
    two_fa_type: "",
    two_fa_email: "",
    two_fa_phone: "",
    two_fa_secret: "",

    notes: "",
};
