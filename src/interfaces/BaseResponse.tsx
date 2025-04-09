interface BaseResponse<T> {
  status: number;
  message: string;
  timestamp: string;
  data: T;
}

export default BaseResponse;