import type z from "zod";
import type { schema } from "../constants/schemas";

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  gender: string;
  accessToken: string;
  refreshToken: string;
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  sku?: string;
  rating: number;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  description: string;
}
export interface ProductFormData {
  title: string;
  brand: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}

export interface ColumnSort {
  id: string;
  desc: boolean;
}

export interface ColumnSize {
  id: string;
  size: number;
}

export type FormData = z.infer<typeof schema>;

export interface LoginData extends FormData {
  expiresInMins?: number;
}
