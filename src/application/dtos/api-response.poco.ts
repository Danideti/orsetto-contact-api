export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;

  static ok<T>(data: T): ApiResponse<T> {
    const response = new ApiResponse<T>();
    response.success = true;
    response.data = data;
    return response;
  }

  static fail(error: string): ApiResponse<null> {
    const response = new ApiResponse<null>();
    response.success = false;
    response.error = error;
    return response;
  }
}