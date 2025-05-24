import axios from "axios";


const API_KEY = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const getDirections = async ({
    origin, 
    destination,
    mode = 'driving',
    language = 'es'}) => {
    try {
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await axios.get(
            `${corsProxyUrl}https://maps.googleapis.com/maps/api/directions/json`, {
                params: {
                    origin,
                    destination,
                    mode,
                    language,
                    region: 'co',
                    key: API_KEY,
                }
            }
        );
        return
    } catch (error) {
        console.error("Error fetching directions:", error);
        throw error;
    }
}