import axios from "axios"

const API = axios.create({

  baseURL:
    "https://visionaid-backend-twvc.onrender.com"
})

export default API