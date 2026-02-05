import axiosClient from "./axioClient";

// get balance
export const fetchBalance = async () => {
    try {
        const res = await axiosClient.get("/api/v1/paytm/balance");
        return { success: true, data: res.data };
    } catch (err) {
        console.error(err);
        return { success: false };
    }
};

// search users
export const searchUsers = async (filter = "") => {
    try {
        const res = await axiosClient.get(
            `/api/v1/paytm/search?filter=${filter}`
        );

        return { success: true, data: res.data.users };
    } catch (err) {
        console.error(err);
        return { success: false };
    }
};

export const showUser = async () => {
    try {
        const res = await axiosClient.get('/api/v1/paytm/show-user');
        return { success: true, data: res.data };
    } catch (err) {
        console.log(err);
        return { success: false };
    }
}

export const transferMoney = async (amount, to) => {
    try {
        const res = await axiosClient.post("/api/v1/paytm/transfer", {
            amount,
            to
        });

        return { success: true, data: res.data };

    } catch (err) {
        console.error("Transfer error:", err);
        return { success: false, error: err };
    }
};
