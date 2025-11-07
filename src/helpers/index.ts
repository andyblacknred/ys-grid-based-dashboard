export const getRandomId = (): string => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    // fallback
    return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};
