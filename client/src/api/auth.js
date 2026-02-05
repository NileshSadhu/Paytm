import axiosClient from "./axioClient";

export const signInCall = async (email, password) => {
    try {
        const response = await axiosClient.post("/api/v1/auth/signIn", {
            email,
            password
        });

        const token = response?.data?.token;

        if (!token) {
            return { success: false };
        }

        localStorage.setItem("token", token);

        return { success: true, data: response.data };

    } catch (error) {
        console.error("SignIn error:", error);
        return { success: false, error };
    }
};

export const signUpCall = async (username, email, password) => {
    try {
        const response = await axiosClient.post("/api/v1/auth/signUp", {
            username,
            email,
            password
        });

        const token = response?.data?.token;

        if (!token) {
            return { success: false };
        }

        localStorage.setItem("token", token);

        return { success: true, data: response.data };

    } catch (error) {
        console.error("SignUp error:", error);
        return { success: false, error };
    }
};

export const changePwdCall = async (oldPassword, newPassword) => {
    try {
        const response = await axiosClient.post("/api/v1/auth/change-password", {
            oldPassword,
            newPassword
        });

        return { success: true, data: response.data };

    } catch (error) {
        console.error("Change password error:", error);
        return { success: false, error };
    }
};
