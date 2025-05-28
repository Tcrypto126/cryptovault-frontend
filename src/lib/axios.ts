import axios from "axios";

const baseURL = process.env.SERVER_URL || "https://localhost:5000";

export const instance = axios.create({ baseURL });

export default instance;
