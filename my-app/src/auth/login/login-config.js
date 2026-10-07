// loginFormConfig.js

export const authFormConfig = (isLoginFlag) => {

  const config =
  {

    // can create different config for login and register forms based on the isLoginFlag
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
    ],
  }

  return config;



};

export const authFormDefaultValues = {
  email: "",
  password: "",
};