export default function CredentialSelector({
    credentials,
    // anchorElement,   
    onClose
}) {

    if (!credentials?.length) {
        return null;
    }


    function handleSelect(credential) {

        window.dispatchEvent(
            new CustomEvent(
                "password-manager-fill",
                {
                    detail: credential
                }
            )
        );

        onClose();
    }


    return (
        <div
            style={{
                position: "fixed",
                top: "100px",
                left: "100px",
                width: "280px",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow:
                    "0 8px 30px rgba(0,0,0,.15)",
                padding: "8px",
                fontFamily:
                    "Arial, sans-serif"
            }}
        >

            <div
                style={{
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "600"
                }}
            >
                Passwords
            </div>


            {credentials.map((credential) => (

                <button
                    key={credential.id}
                    type="button"
                    onClick={() =>
                        handleSelect(credential)
                    }
                    style={{
                        width: "100%",
                        textAlign: "left",
                        border: "0",
                        background: "transparent",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >

                    <div
                        style={{
                            fontWeight: "600",
                            fontSize: "13px"
                        }}
                    >
                        {credential.name}
                    </div>

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#666",
                            marginTop: "3px"
                        }}
                    >
                        {credential.username}
                    </div>

                </button>

            ))}

        </div>
    );
}