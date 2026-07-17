import axios from "axios"
//import.meta.env.VITE_PUBLIC_API_KEY
export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // opcional
})
