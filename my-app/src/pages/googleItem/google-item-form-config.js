export const googleFormConfig = {
  step: "google",

  ui: {
    create: {
      title: "Add Google Account",
      description: "Save your Google account details.",
      submitText: "Save Google Account",
      loadingText: "Saving...",
    },


    update: {
      title: "Edit Google Account",
      description: "Update your Google account details.",
      submitText: "Update Google Account",
      loadingText: "Updating...",
    },


  },

  fields: [
    {
      fieldKey: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "e.g. Personal Gmail",
    },


    {
      fieldKey: "website",
      label: "Website",
      type: "text",
      required: true,
      placeholder: "https://accounts.google.com",
    },

    {
      fieldKey: "email",
      label: "Email",
      type: "text",
      required: true,
      placeholder: "user@gmail.com",

      validations: {
        format: "email",
      },
    },

    {
      fieldKey: "notes",
      label: "Notes",
      type: "text",
      required: false,
      placeholder: "Main Google account",
    },


  ],
};

export const googleFormDefaultValues = {
  name: "",
  website: "",
  email: "",
  notes: "",
};
