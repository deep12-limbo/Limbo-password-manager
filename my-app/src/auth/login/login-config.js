// loginFormConfig.js

export const authFormConfig = (isLoginFlag) => {

  const config = {

    step: isLoginFlag ? "login" : "register",
    fields: [
      {
        fieldKey: "email",
        label: "Email",
        type: "text",
        required: true,
        placeholder: "john@gmail.com",
        validations: {
          maxLength: 100,
        },
      },

      {
        fieldKey: "password",
        label: "Password",
        type: "text",
        required: true,
        placeholder: "••••••••",

        validations: {
          minLength: 6,
          maxLength: 100,
        },
      },

      /*
       * Only shown on the register step.
       * Cross-field check: must match "password".
       */
      ...(!isLoginFlag
        ? [
          {
            fieldKey: "confirmPassword",
            label: "Confirm Password",
            type: "text",
            required: true,
            placeholder: "••••••••",

            validations: {
              minLength: 6,
              maxLength: 100,
              validate: (value, formValues) =>
                value === formValues.password ||
                "Passwords do not match",
            },
          },
        ]
        : []),
    ],
  };

  return config;
};

export const authFormDefaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};