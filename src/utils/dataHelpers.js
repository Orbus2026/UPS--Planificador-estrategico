export const processData = (items) => {
    if (!items) return [];
    return items.map(item => ({
        ...item,
        progress: Math.floor(Math.random() * 100), // Simulate progress for demo
        status: "PENDIENTE" // To be computed
    }));
};
