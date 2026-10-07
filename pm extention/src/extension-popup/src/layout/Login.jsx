import { Button } from '@pm/shared'
import { useAuthContext } from '../context/auth'



export default function Login() {
    const auth = useAuthContext();
    const variant = Button.variants.primary
    console.log('variant', variant)
    const login = auth.login;
    console.log(
        auth.login
    )

    return (
        <div className='w-full h-full flex flex-col items-center '>
            <div className='flex items-center justify-start  p-5'>
                <p className="font-bold text-[20px] ">
                    Password Manager
                </p>
            </div>
            <div className=' h-full flex items-center justify-center mt-[-10] '>
                <Button.Root onClick={login} className='px-20 py-5  ' variant="primary">
                    <Button.Text>
                        Login
                    </Button.Text>
                </Button.Root>

            </div>

        </div>
    )
}
