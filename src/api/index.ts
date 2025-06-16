import instance from "@/lib/axios";

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

export const updatePassword = async (
  data: {
    oldPassword: string;
    newPassword: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/user/password", data);

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating password:", error);
    onError(error.response.data.message);
  }
};

export const updateKYC = async (
  data: {
    phone_number: string;
    address: string;
    government_id: File | string;
    id_card: File | string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append("phone_number", data.phone_number);
    formData.append("address", data.address);
    formData.append("government_id", data.government_id);
    formData.append("id_card", data.id_card);

    const res = await instance.put("/api/user/kyc", formData, {
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
    console.error("Error updating KYC:", error);
    onError(error.response.data.message);
  }
};

export const forgotPassword = async (
  data: {
    email: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/auth/forgot-password", data);

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error sending forgot password email:", error);
    onError(error.response.data.message);
  }
};

export const resetPassword = async (
  data: {
    password: string;
    token: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/auth/reset-password", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error resetting password:", error);
    onError(error.response.data.message);
  }
};

// Deposit
export const deposit = async (
  data: {
    amount: number;
    type: "DEPOSIT";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/balance", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error depositing:", error);
    onError(error.response.data.message);
  }
};

// Withdraw
export const withdraw = async (
  data: {
    amount: number;
    type: "WITHDRAWAL";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/balance", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error withdrawing:", error);
    onError(error.response.data.message);
  }
};

// Add bonus
export const addBonus = async (
  data: {
    amount: number;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/balance", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error adding bonus:", error);
    onError(error.response.data.message);
  }
};
