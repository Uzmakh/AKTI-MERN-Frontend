import axios from "axios";

import BASE_URL from "../../../constants/secrets/baseUrl"; //http:localhost:5000/api/v1

const addNoteEndPoint = "/notes"
// call required endpints from END_POINTS constant objects

const addNoteApiService = async (addNoteFormData,) => {
    try {
        const response = await axios.post(`${BASE_URL}${addNoteEndPoint}`, addNoteFormData);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export default addNoteApiService