import { User } from "@/store";
import instance from "./axios";

const verifyToken = async (
  token: string
): Promise<{ isTokenValid: boolean; user: User | null }> => {
  if (!token || token === "") {
    return { isTokenValid: false, user: null };
  }
  try {
    const response = await instance.post("/api/auth/verify-token", { token });
    if (response.status === 200) {
      return { isTokenValid: true, user: response.data.user };
    } else {
      return { isTokenValid: false, user: null };
    }
  } catch (err) {
    console.error("Invalid token", err);
    return { isTokenValid: false, user: null };
  }
};

export default verifyToken;
