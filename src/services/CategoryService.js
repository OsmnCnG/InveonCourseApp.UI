import axios from "axios";


export async function getCategories() {
    return await axios.get('https://inveoncourseappapi-production.up.railway.app/api/Category');
}
