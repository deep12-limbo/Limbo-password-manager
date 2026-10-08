export function buildFieldRules(field) {
    const rules = {};
    const validations = field.validations || {};

    if (field.required) {
        rules.required = `${field.label} is required`;
    }

    if (field.type === "text") {
        if (validations.minLength !== undefined) {
            rules.minLength = {
                value: validations.minLength,
                message: `${field.label} must be at least ${validations.minLength} characters`,
            };
        }
        if (validations.maxLength !== undefined) {
            rules.maxLength = {
                value: validations.maxLength,
                message: `${field.label} must be at most ${validations.maxLength} characters`,
            };
        }
        if (validations.min !== undefined || validations.max !== undefined) {
            rules.validate = {
                ...(rules.validate || {}),
                numericRange: (value) => {
                    if (!value && !field.required) return true;
                    const num = Number(value);
                    if (isNaN(num)) return `${field.label} must be a number`;
                    if (
                        validations.min !== undefined &&
                        num < validations.min
                    ) {
                        return `${field.label} must be at least ${validations.min}`;
                    }
                    if (
                        validations.max !== undefined &&
                        num > validations.max
                    ) {
                        return `${field.label} must be at most ${validations.max}`;
                    }
                    return true;
                },
            };
        }
    }

    if (field.type === "select" || field.type === "radio") {
        const allowed = (field.options || []).map((o) => o.value);
        rules.validate = {
            ...(rules.validate || {}),
            validOption: (value) => {
                if (!value && !field.required) return true;
                return (
                    allowed.includes(value) ||
                    `${field.label} has an invalid selection`
                );
            },
        };
    }


    
    /*
     * Custom cross-field / arbitrary validation, e.g.
     * confirmPassword's "must match password" check.
     * Supports either:
     *   validate: (value, formValues) => true | "error message"
     * or a named map:
     *   validate: { matchesPassword: (value, formValues) => ... }
     */
    if (validations.validate) {
        rules.validate = {
            ...(rules.validate || {}),
            ...(typeof validations.validate === "function"
                ? { custom: validations.validate }
                : validations.validate),
        };
    }

    return rules;
}