import instance from "./axios";

const verifyToken = async (token: string): Promise<boolean> => {
  if (!token || token === "") {
    return false;
  }
  try {
    const response = await instance.post("/api/auth/verifyToken", { token });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Invalid token", err);
    return false;
  }
};

export default verifyToken;
