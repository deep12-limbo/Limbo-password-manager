// import CredentialSelector from "./components/CredentialSelector";

// export default function App({
//     credentials,
//     anchorElement,
//     onClose
// }) {

//     return (
//         <CredentialSelector
//             credentials={credentials}
//             anchorElement={anchorElement}
//             onClose={onClose}
//         />
//     );
// }

export default function App({
    credentials,
    // anchorElement,
    onClose
}) {
    return (
        <div
            style={{
                position: "fixed",
                top: "100px",
                right: "20px",
                width: "300px",
                padding: "20px",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                zIndex: 2147483647
            }}
        >
            <h3>Password Manager</h3>

            <p>
                Credentials found: {credentials?.length ?? 0}
            </p>

            <button onClick={onClose}>
                Close
            </button>
        </div>
    );
}