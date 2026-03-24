import apiClient from "./apiClient";

export const employeeApi = {
  getAll: async () => {
    const res = await apiClient.get("/employees");
    return res.data;
  },

  create: async (data) => {
    const res = await apiClient.post("/employees", data);
    return res.data;
  },

  delete: async (id) => {
    const res = await apiClient.delete(`/employees/${id}`);
    return res.data;
  },
};