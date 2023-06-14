import axios from "axios";

const url_be = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

const axiosClient = axios.create({
    baseURL: url_be,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetcher = (url: string) => {
    return axiosClient.get(url).then((res) => res.data);
  };

export default axiosClient;