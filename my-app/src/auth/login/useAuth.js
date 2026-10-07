import {
  authFormConfig,
  authFormDefaultValues,
} from "./login-config";

import useHttp from "../../hooks/useHttp";
import { apis_urls } from "../../apis/api";
import { setLocalStorage, getLocalStorage } from "../../utils/localstorage";
import { data, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/user/usercontext";
import ROUTES from "../../routers/routespath";
import handleNavigate from "../../utils/navigation";



export default function (props) {
  const { isLoginFlag, isExtensionLogin, redirectUri } = props;
  const navigate = useNavigate()
  const http = useHttp();

  const {
    setToken,
    setIsLoggedIn,
    setEmail,
    toggleLoginFlag
  } = useContext(UserContext);

  const { login } = useContext(UserContext);

  const loginHandler = async (formData) => {
    try {

      const url = isExtensionLogin
        ? `${apis_urls.login}?source=extension`
        : apis_urls.login;

      console.log("Login URL:", url, "isExtensionLogin:", isExtensionLogin, "formData:", formData);
      const response = await http.sendRequest(
        url,
        "POST",
        formData
      );

      if (
        isLoginFlag &&
        isExtensionLogin
      ) {

        const code =
          response.data;

        if (!code) {
          throw new Error(
            "Extension authorization code was not returned."
          );
        }

        if (!redirectUri) {
          throw new Error(
            "Extension redirect URI is missing."
          );
        }


        const callbackUrl =
          new URL(
            redirectUri
          );


        callbackUrl.searchParams.set(
          "code",
          code
        );


        window.location.href =
          callbackUrl.toString();


        return;
      }


      if (!response?.success) {
        return;
      }


      if (
        isLoginFlag &&
        isExtensionLogin
      ) {

        const code =
          response.data;

        if (!code) {
          throw new Error(
            "Extension authorization code was not returned."
          );
        }

        if (!redirectUri) {
          throw new Error(
            "Extension redirect URI is missing."
          );
        }


        const callbackUrl =
          new URL(
            redirectUri
          );


        callbackUrl.searchParams.set(
          "code", 
          code
        );


        window.location.href =
          callbackUrl.toString();


        return;
      }


      const token = response?.data;

      if (!token) {
        console.error("Token was not returned");
        return;
      }

      setLocalStorage("token", token);

      login({
        token,
        email: formData.email,
      });

      navigate(ROUTES.GOOGLE_ITEMS);


    } catch (error) {
      console.error("Login failed:", error);
    }
  };




  const registerHandler = async (formData) => {
    console.log("Register data:", formData);

    try {
      const response = await http.sendRequest(
        apis_urls.register,
        "POST",
        formData
      );

      if (!response?.success) {
        return;
      }

      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Registration failed:", error);
    }

  };
  console.log("useAuthData called with isLoginFlag:", isLoginFlag, "formConfig:", authFormConfig(isLoginFlag));
  return {
    formConfig: authFormConfig(isLoginFlag),
    defaultValues: authFormDefaultValues,
    onSubmit: isLoginFlag
      ? loginHandler
      : registerHandler,

    http: http,
  };
}
