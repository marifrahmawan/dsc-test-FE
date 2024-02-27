/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResponse<T = any> {
  message: string;
  data: T;
}
