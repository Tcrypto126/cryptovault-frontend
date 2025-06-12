import instance from "./axios";

const verifyToken = async (
  token: string
): Promise<{ isTokenValid: boolean; role: "ADMIN" | "USER" | null }> => {
  if (!token || token === "") {
    return { isTokenValid: false, role: null };
  }
  try {
    const response = await instance.post("/api/auth/verify-token", { token });
    if (response.status === 200) {
      return { isTokenValid: true, role: response.data.role };
    } else {
      return { isTokenValid: false, role: null };
    }
  } catch (err) {
    console.error("Invalid token", err);
    return { isTokenValid: false, role: null };
  }
};

export default verifyToken;
