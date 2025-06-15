import instance from "@/lib/axios";
import { toast } from "sonner";

export const signup = async (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const response = await instance.post("/api/auth/signup", {
      email,
      password,
    });
    if (response.status === 201) {
      onSuccess();
    } else {
      onError(response.data.message);
    }
  } catch (error: any) {
    console.error("error: ", error);
    onError(error.response.data.message);
  }
};

export const updateProfile = async (
  data: any,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("username", data.username);

    const res = await instance.put("/api/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating profile:", error);
    onError(error.response.data.message);
  }
};
