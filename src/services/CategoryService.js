import axios from "axios";


export async function getCategories() {
    return await axios.get('https://localhost:7055/api/Category');
}