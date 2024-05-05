import httpInstance from "../httpInstance";

export const getRecommendations = async (movieId: String) => {
    const endpoint = `${movieId}/recommendations?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    try {
        const response = await httpInstance.get(endpoint);
        if (response.data && response.data.results) {
            return response.data.results; // Asegúrate de que estamos accediendo correctamente
        } else {
            console.log("Response is missing 'data' or 'results'");
            return [];
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
};
