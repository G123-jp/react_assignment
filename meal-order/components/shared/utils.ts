export const parseIntWithFallback = (str: string, radix: number, fallback: number) => {
    const value = Number.parseInt(str, radix);
    return Number.isNaN(value) ? fallback : value;
};