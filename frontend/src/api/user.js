import api from "../lib/axios";
import { extractErrorMessage } from "../utils";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
