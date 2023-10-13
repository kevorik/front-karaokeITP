const serverUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;

export const getProxiedServerUrl = (): string => {
    return isProduction ? serverUrl : "/api/v1";
};

export const getEndpointUrl = (path: string): string => {
    return `http://localhost:3000/api/v1/${path}`
}