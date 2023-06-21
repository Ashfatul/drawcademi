import axios from "axios";

const axiosFetch = axios.create({
   baseURL: "https://drawcademi-server.vercel.app/",
});

export default axiosFetch;
