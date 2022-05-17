import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); //creates a api with following base url

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
