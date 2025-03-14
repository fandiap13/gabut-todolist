import axiosInstance from "../api/axiosInstance";

export type StatusType = "today" | "schedule" | "important" | "all";

// Definisi interface untuk Category
export interface CountTaskData {
  todayCount: number;
  scheduleCount: number;
  allCount: number;
}

// Definisi interface untuk Category
export interface Category {
  category_id: number;
  name: string;
}

// Definisi interface untuk User
export interface User {
  user_id: number;
  email: string;
  name: string;
}

// Definisi interface untuk Task
export interface TaskList {
  task_id: number;
  task_date: string; // ISO-8601 format
  task_time: string; // ISO-8601 format
  title: string;
  description: string;
  status: number;
  category_id: number;
  created_at: string; // ISO-8601 format
  updated_at: string; // ISO-8601 format
  user_id: number;
  category: Category; // Menggunakan interface Category
  user: User; // Menggunakan interface User
}

export const fetchListTask = async (params: any): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/list-task`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    // throw error;
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Gagal mengambil data task"
    );
  }
};

export const addTask = async (values: any): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/list-task`, values);
    return response.data;
  } catch (error: any) {
    // throw error;
    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Gagal menambah task"
    );
  }
};

export const updateTask = async (
  task_id: number,
  values: any
): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/list-task`, {
      task_id,
      ...values,
    });
    return response.data;
  } catch (error: any) {
    // throw error;
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Gagal mengambil mengubah task"
    );
  }
};

export const updateCheckTask = async (
  task_id: number,
  status: string | number
): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/list-task/check-task`, {
      task_id,
      status,
    });
    return response.data;
  } catch (error: any) {
    // throw error;
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Gagal mengambil mengubah task"
    );
  }
};

export const deleteTask = async (task_id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/list-task/`, {
      data: {
        task_id,
      },
    });
    return response.data;
  } catch (error: any) {
    // throw error;
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Gagal mengambil menghapus task"
    );
  }
};
