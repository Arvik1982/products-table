import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; total: number; skip: number; limit: number },
      {
        limit?: number;
        skip?: number;
        search?: string;
        sortBy?: string;
        order?: string;
      }
    >({
      query: ({
        limit = 20,
        skip = 0,
        search = "",
        sortBy = "",
        order = "asc",
      }) => {
        let url = `products`;
        const params = [];

        if (search) {
          url = `products/search`;
          params.push(`q=${search}`);
        }

        params.push(`limit=${limit}`);
        params.push(`skip=${skip}`);

        if (sortBy) {
          params.push(`sortBy=${sortBy}`);
          params.push(`order=${order}`);
        }

        return `${url}?${params.join("&")}`;
      },
      providesTags: ["Product"],
    }),

    searchProducts: builder.query<
      { products: Product[]; total: number; skip: number; limit: number },
      { q: string; limit?: number }
    >({
      query: ({ q, limit = 20 }) => `products/search?q=${q}&limit=${limit}`,
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "products/add",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: number; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
