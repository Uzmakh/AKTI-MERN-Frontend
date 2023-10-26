import axios from "axios";

import BASE_URL from "../../../constants/secrets/baseUrl"; //http:localhost:5000/api/v1

const addNoteEndPoint = "/notes"
// call required endpints from END_POINTS constant objects

const deleteNoteByIdApiService = async (noteId) => {
    try {
        const response = await axios.delete(`${BASE_URL}${addNoteEndPoint}/${noteId}`);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export default deleteNoteByIdApiService