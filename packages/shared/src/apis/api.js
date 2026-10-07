const Base_API = import.meta.env.VITE_BASE_API || "https://password-management-yiv9.onrender.com/api";
// console.log("base api ", Base_API)

console.log("Baseapi", Base_API)


const apis_urls = {
    healthCheck: `${Base_API}/v1/server`,
    register: `${Base_API}/auth/register`,
    login: `${Base_API}/auth/login`,
    Extlogin: (params) => `/auth/login${params ? `?${params}` : ""}`,
    generateExtensionCode: "/auth/generate-extension-code",
    createVaultItem: `${Base_API}/vault/create-vault-item`,
    getAllVaultItems: `${Base_API}/vault/get-all-vault`,
    getVaultItem: (id) => `${Base_API}/vault/view-vault-item/${id}`,
    updateVaultItem: (id) => `${Base_API}/vault/update-vault-item/${id}`,
    deleteVaultItem: `${Base_API}/vault/delete-vault-item`,
    createGoogleItem: `${Base_API}/google/create-google-item`,
    getAllGoogleItems: `${Base_API}/google/get-all-google-item`,
    getGoogleItem: (id) => `${Base_API}/google/view-google-item/${id}`,
    updateGoogleItem: (id) => `${Base_API}/google/update-google-item/${id}`,
    deleteGoogleItem: `${Base_API}/google/delete-google-item`
}




export { apis_urls };




//   --------|-------------------------------------|------|-------------------------------
//   GET     | /v1/server                      | No   | Health check
//   POST    | /auth/register                  | No   | Register new user
//   POST    | /auth/login                     | No   | Login and get JWT
//   POST    | /vault/create-vault-item        | Yes  | Create vault entry
//   GET     | /vault/get-all-vault            | Yes  | List vault items (paginated)
//   GET     | /vault/view-vault-item/:id      | Yes  | Get vault item by ID
//   PUT     | /vault/update-vault-item/:id    | Yes  | Update vault item
//   DELETE  | /vault/delete-vault-item        | Yes  | Bulk delete vault items
//   POST    | /google/create-google-item      | Yes  | Create Google entry
//   GET     | /google/get-all-google-item     | Yes  | List Google items (paginated)
//   GET     | /google/view-google-item/:id    | Yes  | Get Google item by ID
//   PUT     | /google
//   DELETE  | /google/delete-google-item      | Yes  | Bulk delete Google items

