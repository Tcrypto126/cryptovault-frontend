import instance from "@/lib/axios";
import { Support, Transaction, User } from "@/store";

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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Get user
export const getUser = async (
  onSuccess: (user: User) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get(`/api/user/profile`);
    if (res.status === 200) {
      const user: User = res.data.user;
      onSuccess(user);
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Get users by admin
export const getAllUsers = async (
  onSuccess: (users: User[]) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get(`/api/user/all-user`);
    if (res.status === 200) {
      const users: User[] = res.data.users;
      onSuccess(users);
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

export const updateProfile = async (
  data: {
    avatar: File | string;
    first_name: string;
    last_name: string;
    username: string;
  },
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Add bonus
export const addBonus = async (
  data: {
    amount: number;
    type: "BONUS";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/bonus", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Send bonus
export const sendBonus = async (
  data: {
    amount: number;
    email: string;
    type: "TRANSFER";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/bonus", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Get all transactions
export const getTransactions = async (
  onSuccess: (transactions: Transaction[]) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/transactions/get-transaction");

    if (res.status === 200) {
      const transactions: Transaction[] = res.data.transactions || [];
      const newTransactions =
        transactions.length > 0
          ? transactions.sort(
              (a: Transaction, b: Transaction) =>
                new Date(b?.created_at || "").getTime() -
                new Date(a?.created_at || "").getTime()
            )
          : [];
      onSuccess(newTransactions);
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Get all transactions by admin
export const getAllTransactions = async (
  onSuccess: (transactions: Transaction[]) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/transactions/all-transaction");

    if (res.status === 200) {
      const transactions: Transaction[] = res.data.transactions || [];
      const newTransactions =
        transactions.length > 0
          ? transactions.sort(
              (a: Transaction, b: Transaction) =>
                new Date(b?.created_at || "").getTime() -
                new Date(a?.created_at || "").getTime()
            )
          : [];
      onSuccess(newTransactions);
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Send support
export const sendSupport = async (
  data: {
    subject: string;
    message: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/support/create", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Get support
export const getSupports = async (
  onSuccess: (supports: Support[]) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/support/get-supports");
    if (res.status === 200) {
      const supports: Support[] = res.data.supports || [];
      const newSupports =
        supports.length > 0
          ? supports.sort(
              (a: Support, b: Support) =>
                new Date(b.updated_at || "").getTime() -
                new Date(a.updated_at || "").getTime()
            )
          : [];
      onSuccess(newSupports);
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Delete support
export const deleteSupport = async (
  id: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.delete(`/api/support/delete`, {
      data: {
        id,
      },
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Update user status by admin
export const updateUserStatus = async (
  email: string,
  status: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/user/status", {
      email,
      status,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Approve withdrawal request
export const approveWithdrawal = async (
  id: string,
  email: string,
  amount: number,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/transactions/approve-withdrawal", {
      id,
      email,
      amount,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Approve KYC by admin
export const handleKYC = async (
  email: string,
  type: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/user/handle-kyc", {
      email,
      type,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Get all supports by admin
export const getAllSupports = async (
  onSuccess: (supports: Support[]) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/support/get-all-support");
    if (res.status === 200) {
      const supports: Support[] = res.data.supports || [];
      const newSupports =
        supports.length > 0
          ? supports.sort(
              (a: Support, b: Support) =>
                new Date(b.updated_at || "").getTime() -
                new Date(a.updated_at || "").getTime()
            )
          : [];
      onSuccess(newSupports);
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Update support by admin
export const updateSupport = async (
  id: string,
  message: string,
  reply: string,
  status: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/support/update", {
      id,
      message,
      reply,
      status,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};

// Verify email
export const verifyEmail = async (
  token: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post(`/api/auth/verify-email`, { token });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error: ", error);
      // Handle case where error.response may not exist
      const message =
        error instanceof Object && "response" in error
          ? (error.response as { data: { message: string } }).data.message
          : error.message;
      onError(message);
    } else {
      onError("An unknown error occurred");
    }
  }
};
