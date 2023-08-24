import axios from "axios";
import BASEURL from "./url-api";

const http = axios.create({
  baseURL: BASEURL.url,
  headers: {
    // Authorization: 'Bearer {token}'
    Accept: "application/json",
  },
});

export default http;
