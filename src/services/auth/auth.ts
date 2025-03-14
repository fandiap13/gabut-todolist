import axiosInstance from "../api/axiosInstance";

export const storeUserLogin = async ({
  email,
  name,
}: {
  email: string | null;
  name: string | null;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/login`, {
      email,
      name,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
