import axios from "axios";

import BASE_URL from "../../../constants/secrets/baseUrl"; //http:localhost:5000/api/v1

const getAllNotesApiEndPoint = "/notes"

const getAllNotesApiService = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${getAllNotesApiEndPoint}`);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export default getAllNotesApiService