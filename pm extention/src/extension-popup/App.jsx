import { useEffect } from "react";
import { ItemManager } from "./src/component";
import { useAuthContext } from "./src/context/auth";
import Login from "./src/layout/Login";
import { Spinner } from "@pm/shared";

function LoginLayout({ children }) {
  return <div style={{ height: "400px" }} className="flex h-full w-[45rem] h-[400px] items-center justify-center">
    {children}
  </div>

}




function App() {



  const {
    isLoading,
    isLoggedIn,
    token,
    jwt,
    email,
    logout,
  } = useAuthContext();


  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn, token, jwt, email);
  }, [isLoggedIn, isLoading, token, jwt, email, logout]);

  // Auth state is still being checked
  if (isLoading) {
    return (
      <LoginLayout>
        <Spinner />
      </LoginLayout>
    );
  }


  // User is not logged in
  if (!isLoggedIn) {
    return (
      <LoginLayout>
        <Login />
      </LoginLayout>
    );
  }


  // User is authenticated
  return (
    <div className="w-[45rem]">
      <ItemManager />
    </div>
  );
}

export default App;