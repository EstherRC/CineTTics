import httpInstance from "../httpInstance";

export const getDetails = async (movieId: string) => {
    let res: any;
    const endpoint = `${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`;
    await httpInstance
    .get(endpoint)
    .then((data) => {
        res = data;
    })
    .catch((err) => {
        res = err.response;
    });
    return res;
};