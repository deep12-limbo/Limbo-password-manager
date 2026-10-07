import GoogleItemsProvider from "../../context/google-items/GoogleProvider";
import ItemForm from "../ItemForm";
import { useGoogleData } from "./useGoogleData";
export default function GoogleForm() {



    return (
        <GoogleItemsProvider >
            <ItemForm useHook={useGoogleData} isEditMode={false} />
        </GoogleItemsProvider>
    )
}

