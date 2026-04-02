import api from "../lib/axios";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
