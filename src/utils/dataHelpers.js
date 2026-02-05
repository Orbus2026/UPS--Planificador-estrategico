export const processData = (items) => {
    if (!items) return [];
    return items.map(item => ({
        ...item,
        progress: item.progress !== undefined ? item.progress : 0,
        status: item.status || "PENDIENTE",
        hasEvidence: item.hasEvidence || false
    }));
};
