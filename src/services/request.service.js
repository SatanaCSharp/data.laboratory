import axios from "axios";
import config from "../config";

const getEducationQueueRequest = async() => {
    const educationQueueResponse = await axios.get(`${config.API_BASE_URL}${config.VERSION}/education-queue`);
    return educationQueueResponse.data;
};

export {
    getEducationQueueRequest
};
