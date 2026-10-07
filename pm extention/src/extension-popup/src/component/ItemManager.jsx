import Item from './Item'
import { Nav } from './Nav'
import { SideBar } from './SideBar'
import { ItemManagerProvider } from './ItemManagerProvider'

export function ItemManager() {
    return (
        <ItemManagerProvider>
            <div className='flex flex-col justify-center h-full m-5'>

                <Nav />
                <div className='flex w-full h-full'>

                    <SideBar />
                    <Item />
                </div>

            </div>
        </ItemManagerProvider>
    )
}
