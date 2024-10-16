import axios from "axios";

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Menginformasikan jenis konten yang dikirim
        },
      }
    );

    console.log(response.data); // Log the response data

    const data = response.data;
    if (response.status === 200) {
      // Check if token and role exist in the response
      if (data.token && data.data.role) {
        // Save token and role to LocalStorage
        localStorage.setItem("username", username);
        localStorage.setItem("token", data.token); // Save the token
        localStorage.setItem("role", data.data.role); // Save the user's role

        return {
          success: true,
          role: data.data.role,
          message: data.message,
        };
      } else {
        return {
          success: false,
          message: "Token atau role tidak ditemukan.",
        };
      }
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