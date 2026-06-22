import axios from "axios"
import config from "./config"

export async function loginUser(email, password) {

    try {

        const URL = config.BASE_URL + "/user/signin"

        const body = {
            email: email.trim(),
            password: password.trim()
        }

        console.log("REQUEST URL:", URL)
        console.log("REQUEST BODY:", body)

        const response = await axios.post(URL, body)

        console.log("API RESPONSE:", response.data)

        return response.data

    } catch (error) {

        console.log("AXIOS ERROR:", error)

        return {
            status: "error",
            error: error.message
        }
    }
}