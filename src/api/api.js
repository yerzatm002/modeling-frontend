import axios from "axios";

// Базовый URL сервера
const API_URL = "http://localhost:5000/api";

// Создаем экземпляр Axios
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка при регистрации";
  }
};

export const loginUser = async (credentials) => {
    try {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token); // Сохранение токена в localStorage
    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка при входе";
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Нет токена");

    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка при получении профиля";
  }
};


const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  export const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении списка пользователей";
    }
  };
  
  export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении пользователя";
    }
  };
  
  export const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, updatedData, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при обновлении профиля";
    }
  };
  
  export const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при удалении пользователя";
    }
  };

export const getCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении списка курсов";
    }
  };
  
  export const getCourseById = async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении информации о курсе";
    }
  };
  
  export const createCourse = async (courseData) => {
    try {
      const response = await axios.post(`${API_URL}/courses`, courseData, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при добавлении курса";
    }
  };
  
  export const updateCourse = async (courseId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/courses/${courseId}`, updatedData, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при обновлении курса";
    }
  };
  
  export const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`${API_URL}/courses/${courseId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при удалении курса";
    }
  };

export const getLessonsByCourse = async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/courses/${courseId}/lessons`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении списка уроков";
    }
  };
  
  export const getLessonById = async (lessonId) => {
    try {
      const response = await axios.get(`${API_URL}/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении информации об уроке";
    }
  };
  
  export const createLesson = async (courseId, lessonData) => {
    try {
      const response = await axios.post(`${API_URL}/courses/${courseId}/lessons`, lessonData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при добавлении урока";
    }
  };
  
  export const updateLesson = async (lessonId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/lessons/${lessonId}`, updatedData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при обновлении урока";
    }
  };
  
  export const deleteLesson = async (lessonId) => {
    try {
      const response = await axios.delete(`${API_URL}/lessons/${lessonId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при удалении урока";
    }
  };

export const getUserProgress = async () => {
    try {
      const response = await axios.get(`${API_URL}/progress`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении прогресса пользователя";
    }
  };
  
  export const saveUserProgress = async (progressData) => {
    try {
      const response = await axios.post(`${API_URL}/progress`, progressData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при сохранении прогресса";
    }
  };

export const getTools = async () => {
    try {
      const response = await axios.get(`${API_URL}/tools`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении списка инструментов";
    }
  };
  
  export const getToolById = async (toolId) => {
    try {
      const response = await axios.get(`${API_URL}/tools/${toolId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении информации об инструменте";
    }
  };
  
  export const createTool = async (toolData) => {
    try {
      const response = await axios.post(`${API_URL}/tools`, toolData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при добавлении инструмента";
    }
  };
  
  export const updateTool = async (toolId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/tools/${toolId}`, updatedData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при обновлении инструмента";
    }
  };
  
  export const deleteTool = async (toolId) => {
    try {
      const response = await axios.delete(`${API_URL}/tools/${toolId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при удалении инструмента";
    }
  };

export const getChallenges = async () => {
    try {
      const response = await axios.get(`${API_URL}/challenges`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении списка челленджей";
    }
  };
  
  export const getChallengeById = async (challengeId) => {
    try {
      const response = await axios.get(`${API_URL}/challenges/${challengeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении информации о челлендже";
    }
  };
  
  export const createChallenge = async (challengeData) => {
    try {
      const response = await axios.post(`${API_URL}/challenges`, challengeData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при добавлении челленджа";
    }
  };
  
  export const updateChallenge = async (challengeId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/challenges/${challengeId}`, updatedData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при обновлении челленджа";
    }
  };
  
  export const deleteChallenge = async (challengeId) => {
    try {
      const response = await axios.delete(`${API_URL}/challenges/${challengeId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при удалении челленджа";
    }
  };

export const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data"
        }
      });
  
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при загрузке файла";
    }
  };
  
  export const getFileUrl = (filename) => {
    return `${API_URL}/uploads/${filename}`;
  };
  
  export const deleteFile = async (filename) => {
    try {
      const response = await axios.delete(`${API_URL}/uploads/${filename}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при удалении файла";
    }
  };


export const getAdminUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении списка пользователей";
    }
  };
  
  export const getAdminDashboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Ошибка при получении статистики";
    }
  };

  export const getAllTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    return res.data;
  };
  
  export const getTaskById = async (taskId) => {
    const res = await axios.get(`${API_URL}/tasks/${taskId}`);
    return res.data;
  };
  
  export const submitTask = async (taskId, file, comment) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("comment", comment);
  
    const res = await axios.post(`${API_URL}/tasks/${taskId}/submit`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
  
    return res.data;
  };
  
  export const getMySubmissions = async () => {
    const res = await axios.get(`${API_URL}/tasks/user/submissions`, {
      headers: getAuthHeader(),
    });
    return res.data;
  };
  
  // Преподавателю / админу
  export const getAllSubmissions = async () => {
    const res = await axios.get(`${API_URL}/admin/submissions`, {
      headers: getAuthHeader(),
    });
    return res.data;
  };
  
  export const getSubmissionsByTask = async (taskId) => {
    const res = await axios.get(`${API_URL}/admin/submissions/${taskId}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  };
  
  export const gradeSubmission = async (submissionId, grade, feedback) => {
    const res = await axios.put(
      `${API_URL}/admin/submissions/${submissionId}/grade`,
      { grade, feedback },
      { headers: getAuthHeader() }
    );
    return res.data;
  };
  
  export const getStudentsList = async () => {
    const res = await axios.get(`${API_URL}/admin/students`, {
      headers: getAuthHeader(),
    });
    return res.data;
  };

  // ✅ Получить все вопросы по уроку
export const getQuizzesByLesson = async (lessonId) => {
  const res = await axios.get(`${API_URL}/quiz/lesson/${lessonId}`);
  return res.data;
};

// ✅ Отправить ответ на тест
export const submitQuizAnswer = async (quizId, answer) => {
  console.log(getAuthHeader())
  const res = await axios.post(
    `${API_URL}/quiz/${quizId}/answer`,
    { answer }, 
    { headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    } }
  );
  return res.data;
};

// ✅ Получить прогресс пользователя по тестам
export const getUserQuizProgress = async (userId) => {
  const res = await axios.get(`${API_URL}/quiz/user/${userId}/progress`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getTasksByLesson = async (lessonId) => {
  const res = await axios.get(`${API_URL}/tasks/lesson/${lessonId}`);
  return res.data;
};

export const getAllLessons = async () => {
  const res = await axios.get(`${API_URL}/lessons`);
  return res.data;
};