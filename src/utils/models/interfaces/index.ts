import { Schema } from "mongoose";

export interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IIDPayload {
  _id: Schema.Types.ObjectId;
}

export interface INumberGenericResponse extends IGenericResponse<number> {}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface IRecord {
  [name: string]: any;
}
