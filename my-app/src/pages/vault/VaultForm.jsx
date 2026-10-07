import VaultItemContextProvider from "../../context/vault-item/VaultItemProvider";
import ItemForm from "../ItemForm";
import { useVaultData } from "./useVaultDataHook";
export default function VaultForm() {

    return (
        <VaultItemContextProvider>
            <ItemForm useHook={useVaultData} />
        </VaultItemContextProvider>

    )
}