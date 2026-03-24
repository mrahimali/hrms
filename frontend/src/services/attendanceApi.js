import apiClient from "./apiClient";

export const attendanceApi = {
  getAll: async () => {
    const res = await apiClient.get("/attandance");
    return res.data;
  },

  getByEmployee: async (employeeId) => {
    const res = await apiClient.get(`/attandance?employee=${employeeId}`);
    return res.data;
  },

  create: async (data) => {
    const res = await apiClient.post("/attandance", data);
    return res.data;
  },

  delete: async (id) => {
    const res = await apiClient.delete(`/attandance/delete/${id}`);
    return res.data;
  },

  getTodaySummary: async () => {
    const res = await apiClient.get("/attandance/attendance-summary-today");
    return res.data;
  },
};