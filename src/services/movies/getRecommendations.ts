import httpInstance from "../httpInstance";

export const getRecommendations = async (movieId: String) => {
    const endpoint = `${movieId}/recommendations?api_key=${process.env.REACT_APP_API}&language=en-US`;
    try {
        const response = await httpInstance.get(endpoint);
        if (response.data && response.data.results) {
            return response.data.results; 
        } else {
            console.log("Response is missing 'data' or 'results'");
            return [];
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
};
