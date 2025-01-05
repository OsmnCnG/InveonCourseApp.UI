import axios from "axios";


async function getToken() {
    return await localStorage.getItem('token');
}

export async function getCourses() {
    try {
        return await axios.get('https://localhost:7055/api/Course');  
    }catch (error) {
        console.error('Error fetching courses:', error);
    }
}

export async function getCoursesWithCategory() {
    return await axios.get('https://localhost:7055/api/Course/CoursesWithCategory');
}

export async function getCourseById(id) {
    try {
        const response = await axios.get(`https://localhost:7055/api/Course/GetCourseById`, {
            params: { id },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}


export async function getCourseByInstructorId(id) {

    try {
        const token = await getToken();

        const response = await axios.get(`https://localhost:7055/api/Course/CoursesByInstructor`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { id },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);

        if (error.response && error.response.status === 403) {
            window.location.href = '/Forbidden'; 
        }
    }
}


export async function addCourseToUser(uId, pId) {

    try {
        console.log("userId:", uId);
        console.log("productId:", pId);
        const response = await axios.post(
            `https://localhost:7055/api/Course/AddCourseToUser`,
            {
                params: { uId, pId }
            }
          );
        console.log("Kurs başarıyla kullanıcıya eklendi:", response.data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error("Sunucu hatası:", error.response.data);
        } else {
          console.error("İstek sırasında hata oluştu:", error.message);
        }
      }
}

export async function getUserCourses(userId) {

    try {
        const response = await axios.get(
            `https://localhost:7055/api/Course/UserCourses`,
            {
                params: { userId }
            }
          );
        console.log("Kullanıcı kursları getirildi:", response.data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error("Sunucu hatası:", error.response.data);
        } else {
          console.error("İstek sırasında hata oluştu:", error.message);
        }
      }
}