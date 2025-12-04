// utils/toast.js
import { toast } from "react-toastify";

export const toastSuccess = (message: any) => {
    toast.success(message, {
        position: "bottom-left",
    });
};

export const toastInfo = (message: any) => {
    toast.info(message, {
        position: "bottom-left",
    });
};

export const toastError = (message: any) => {
    toast.error(message, {
        position: "top-right",
    });
};
