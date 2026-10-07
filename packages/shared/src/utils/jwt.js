export function parseJwt(token) {
    try {
        if (!token) {
            return {
                error: "No token provided"
            };
        }

        const parts = token.split(".");

        if (parts.length !== 3) {
            return {
                error: "Invalid JWT format"
            };
        }

        const [headerPart, payloadPart] = parts;

        const header = JSON.parse(
            base64UrlDecode(headerPart)
        );

        const payload = JSON.parse(
            base64UrlDecode(payloadPart)
        );

        let expiresAt = null;
        let isExpired = false;

        if (payload.exp) {
            expiresAt = new Date(
                payload.exp * 1000
            );

            isExpired =
                Date.now() >=
                payload.exp * 1000;
        }

        return {
            header,
            payload,
            expiresAt,
            isExpired
        };

    } catch (error) {
        return {
            error: error.message
        };
    }
}

function base64UrlDecode(value) {
    const base64 =
        value
            .replace(/-/g, "+")
            .replace(/_/g, "/");

    const padded =
        base64.padEnd(
            Math.ceil(base64.length / 4) * 4,
            "="
        );

    return atob(padded);
}