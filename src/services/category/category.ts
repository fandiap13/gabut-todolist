import axiosInstance from "../api/axiosInstance";

export const fetchListCategory = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/list-category`);
    return response.data;
  } catch (error: any) {
    // throw error;
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data kategori"
    );
  }
};
