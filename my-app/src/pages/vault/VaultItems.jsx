import { useNavigate } from "react-router-dom";

import ItemsManager from "../../components/items/ItemsManager";

import { useVaultData } from "./useVaultDataHook";
import vaultItemContext from "../../context/vault-item/vaultContext";
import VaultItemProvider from "../../context/vault-item/VaultItemProvider";
import VaultForm from "./VaultForm";


export function VaultItems() {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(
            ` /update-vault-item/${id}`
        );
    };

    return (
        <VaultItemProvider>
            <ItemsManager
                useHook={useVaultData}
                contextToConsume={vaultItemContext}
                itemType="Vault"
                // form={<VaultForm></VaultForm>}
                onEdit={handleEdit}
            >
                {/* <VaultForm></VaultForm> */}
            </ItemsManager>
        </VaultItemProvider>

    );
}