import { useNavigate } from "react-router-dom";
import ItemsManager from "../../components/items/ItemsManager";
import { useGoogleData } from "./useGoogleData";
import GoogleItemsContext from "../../context/google-items/googleItems";
import GoogleProvider from "../../context/google-items/GoogleProvider";
import GoogleForm from "./GoogleIForm";

export function GoogleItems() {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/update-google-item/${id}`);
    };

    return (<GoogleProvider> <ItemsManager
        useHook={useGoogleData}
        contextToConsume={GoogleItemsContext}
        itemType="Google"
        onEdit={handleEdit}
    // form={}
    >
        {/* <GoogleForm></GoogleForm> */}
    </ItemsManager > </GoogleProvider>
    );
}
