import axios from "axios";
import BaseResponse from "../interfaces/BaseResponse";

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  get: <T>(url: string, config?: any) =>
    api.get<BaseResponse<T>>(url, config),

  post: <T>(url: string, data?: any, config?: any) =>
    api.post<BaseResponse<T>>(url, data, config),

  put: <T>(url: string, data?: any, config?: any) =>
    api.put<BaseResponse<T>>(url, data, config),

  delete: <T>(url: string, config?: any) =>
    api.delete<BaseResponse<T>>(url, config),
};