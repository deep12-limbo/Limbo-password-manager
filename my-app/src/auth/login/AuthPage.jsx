import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/ui/form/DynamicForm";
import Button from "../../components/ui/Button";

import useAuthData from "./useAuth";
import ROUTES from "../../routers/routespath";
import BgVid from "../../../public/bg-vid.mp4"


export default function AuthPage() {

  const navigate = useNavigate();

  const searchParams =
    new URLSearchParams(
      location.search
    );


  /*
   * If Extension authentication
   */

  const isExtensionLogin =
    searchParams.get(
      "source"
    ) === "extension";


  const redirectUri =
    searchParams.get(
      "redirect_uri"
    );

  console.log(
    "isExtensionLogin", isExtensionLogin, "redirectUri", redirectUri
  )

  const path = useLocation().pathname;
  const login = ROUTES.LOGIN

  const isLoginFlag = path === login;


  const auth = useAuthData(
    isLoginFlag, isExtensionLogin,
    redirectUri
  );

  console.log(
    "islogin flag ", isLoginFlag
  )

  const {
    formConfig,
    defaultValues,
    onSubmit,
    http,
  } = useAuthData({
    isLoginFlag: isLoginFlag,
    isExtensionLogin: isExtensionLogin,
    redirectUri: redirectUri
  });
  // console.log("config:", formConfig, "defaultValues:", defaultValues, "onSubmit:", onSubmit, "http:", http);
  const formId = isLoginFlag
    ? "login-form"
    : "register-form";

  const switchAuthMode = () => {
    navigate(isLoginFlag ? "/register" : login);
  };

  return (
    // <div className="login flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative">
    <div className="login flex h-[100vh] w-full items-center justify-center relative">

      <video
        loop
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      >
        <source src={BgVid} type="video/mp4" />
      </video>

      {/* Video overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Logo / Brand */}
      {/* <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center gap-x-5">

            <div
              className="
              flex size-9 items-center justify-center
              rounded-lg
              bg-electric-violet-400
              font-bold text-white
            "
            >
              P
            </div>

            <span className="text-2xl font-bold text-text-h">
              Password Manager
            </span>

          </div>
        </div> */}


      {/* Auth Box */}
      <div
        className="
        login-container 
    z-[11]
    rounded-lg
    border border-border
    px-4 py-5
    sm:px-6 sm:py-6
    lg:px-8 lg:py-8
    lg:w-[22rem]
  "
      >
        {/* Heading */}
        <div className="mb-4 sm:mb-5">
          <h1 className="text-2xl font-bold ">
            {isLoginFlag ? "Welcome back" : "Create your account"}
          </h1>

          <p className="mt-1 text-xs text-foreground/60 ">
            {isLoginFlag
              ? "Sign in to continue to your account."
              : "Create an account to get started."}
          </p>
        </div>

        {/* Form */}
        <DynamicForm
          step={formConfig}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          formId={formId}
          disabled={http.isLoading}
          className=" "
          fieldsWrapperClassName="flex flex-col gap-4"
          submitClassName="w-full"
          showSubmit={false}
          FormclassName="border-0 p-0"

        // submitLabel={isEditMode ? "Update" : "Save"}
        />

        {/* Submit */}
        <Button.Root
          type="submit"
          form={formId}
          disabled={http.isLoading}
          className="
  mt-7 w-full h-7 p-2 border-0
  bg-gradient-to-r from-[#0d143d] via-[#161e55] to-[#0d143d]
  hover:from-[#121a4a] hover:via-[#1d286b] hover:to-[#121a4a]
  transition-all duration-200
"
          isLoading={http.isLoading}
        >
          <Button.Text className="text-[12px] font-semibold">
            {http.isLoading
              ? isLoginFlag
                ? ""
                : ""
              : isLoginFlag
                ? "Sign in"
                : "Create account"}
          </Button.Text>
        </Button.Root>

        {/* Error */}
        {http.error && (
          <p className="mt-2 break-words text-xs text-red-500 sm:text-sm">
            {http.error}
          </p>
        )}

        {/* Switch Login/Register */}
        <Button.Root
          type="button"
          className="mt-3 w-full text-sm hover:bg-transparent "
          onClick={switchAuthMode}
          variant="ghost"
          disabled={http.isLoading}
        // isLoading={http.isLoading}

        >
          <Button.Text className="text-[12px] hover:underline text-text-dim hover:text-text">
            {isLoginFlag
              ? "Don't have an account? Create one"
              : "Already have an account?"}
          </Button.Text>
        </Button.Root>
      </div>



    </div>
  );
}
