import axios from "axios";

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      username,
      password,
    });

    console.log(response.data); // Tambahkan log ini

    const data = response.data;
    if (response.status === 200) {
      // Simpan token dan role ke LocalStorage
      localStorage.setItem("username", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.data.role);

      return {
        success: true,
        role: data.data.role,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : "Terjadi kesalahan. Silakan coba lagi.",
    };
  }
};
