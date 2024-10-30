// ApiService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 定义 API 响应格式
interface ApiResponse<T> {
  code?: number;
  message?: string;
  data?: T;
}

class API {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, timeout = 5000) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: { 'Content-Type': 'application/json' },
    });

    // 设置响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      },
    );
  }

  // GET 请求
  public async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    return this.axiosInstance.get(url, { params });
  }

  // POST 请求
  public async post<T>(url: string, data?: object): Promise<ApiResponse<T>> {
    return this.axiosInstance.post(url, data);
  }

  // PUT 请求
  public async put<T>(url: string, data?: object): Promise<ApiResponse<T>> {
    return this.axiosInstance.put(url, data);
  }

  // DELETE 请求
  public async delete<T>(
    url: string,
    params?: object,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.delete(url, { params });
  }

  // 动态设置请求头
  public setHeader(name: string, value: string): void {
    this.axiosInstance.defaults.headers.common[name] = value;
  }

  // 动态移除请求头
  public removeHeader(name: string): void {
    delete this.axiosInstance.defaults.headers.common[name];
  }

  // 静态方法：axios.all，用于并发请求
  public static all<T>(requests: Promise<T>[]): Promise<T[]> {
    return axios.all(requests);
  }

  // 静态方法：axios.spread，用于展开并发请求的结果
  public static spread<T>(
    callback: (...args: T[]) => void,
  ): (arr: T[]) => void {
    return axios.spread(callback);
  }
}

export default API;
