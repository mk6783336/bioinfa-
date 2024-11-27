import { toast } from "react-toastify";

export const useToast = () => {
  const notify = (message: string, type: "success" | "error" | "info" = "info") => {
    toast[type](message);
  };

  return { notify };
};

