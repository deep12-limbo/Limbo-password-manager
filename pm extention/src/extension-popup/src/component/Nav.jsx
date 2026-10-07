
import { Button } from "@pm/shared"
import { useAuthContext } from "../context/auth";

export function Nav() {

    const auth = useAuthContext();

    const { isLoggedIn, login, logout } = auth;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3OTAzMTY5MjgsImlhdCI6MTc5MDIzMDUyOCwidXNlcl9pZCI6ImVlYjYzOGZmLTkwNjItNGNjMy1hYjVjLWM3NjNmYTlkNTllYSJ9.VImR7Xi9ePrEERfnzDCi3ciP2t3tcRTW041YlxoIoW4"
    // const isTokenEmpty = token == "" || token == null || token == undefined
    // const loginHandler = () => {
    //     setLocalStorage("token", token)
    // }
    // const logoutHandler = () => {
    //     removeFromLocalStorage("token")
    // }
    return (
        <div className='w-full shadow-sm p-5 mb-1 flex items-center justify-between' >
            <p className='h-full font-semibold text-lg  '>Password Manager </p>
            <Button.Root onClick={isLoggedIn ? logout : login} variant={Button.variants.outline}>
                <Button.Text>{!isLoggedIn ? "Login" : "Logout"} </Button.Text>
            </Button.Root>
            {/* <FormField /> */}
        </div>
    )
}
