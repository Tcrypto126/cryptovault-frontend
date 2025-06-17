import instance from "./axios";

const verifyToken = async (
  token: string
): Promise<{ isTokenValid: boolean }> => {
  if (!token || token === "") {
    return { isTokenValid: false };
  }
  try {
    const response = await instance.post("/api/auth/verify-token", { token });
    if (response.status === 200) {
      return { isTokenValid: true };
    } else {
      return { isTokenValid: false };
    }
  } catch (err) {
    console.error("Invalid token", err);
    return { isTokenValid: false };
  }
};

export default verifyToken;
