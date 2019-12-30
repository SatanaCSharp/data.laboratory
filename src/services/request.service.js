import axios from "axios";
import { API_BASE_URL, VERSION } from "../config";

const getEducationQueueRequest = async() => {
    const educationQueueResponse = await axios.get(`${API_BASE_URL}${VERSION}/education-queue`);
    return educationQueueResponse.data;
};

export {
    getEducationQueueRequest
};
