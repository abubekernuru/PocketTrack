
const validateAmount = (amount) => {
    // Accept numbers and non-empty numeric strings only
    if (
        typeof amount !== "number" &&
        typeof amount !== "string"
    ) {
        return null;
    }

    if (
        typeof amount === "string" &&
        amount.trim() === ""
    ) {
        return null;
    }

    // Accept ordinary decimal numbers, including decimals
    if (
        typeof amount === "string" &&
        !/^\d+(\.\d+)?$/.test(amount.trim())
    ) {
        return null;
    }

    const numericAmount = Number(amount);

    if (
        !Number.isFinite(numericAmount) ||
        numericAmount <= 0
    ) {
        return null;
    }

    return numericAmount;
};

module.exports = { validateAmount };
