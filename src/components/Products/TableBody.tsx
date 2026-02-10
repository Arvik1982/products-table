import React, { useCallback } from "react";
import { flexRender, type Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { AddProductForm } from "./AddProductForm";

import {
  TABLE_TEXTS,
  EDIT_CONFIG,
  DEFAULT_NEW_PRODUCT,
} from "../../constants/products";
import { ERROR_TEXTS, SUCCESS_TEXTS } from "../../constants/texts";
import type { Product, ProductFormData } from "../../types";

interface TableBodyProps {
  isLoading: boolean;
  isAddingProduct: boolean;
  newProductData: ProductFormData;
  addProduct: (data: ProductFormData) => Promise<unknown>;
  refreshProducts: () => void;
  setNewProductData: (data: ProductFormData) => void;
  setIsAddingProduct: (isAdding: boolean) => void;
  columnWidths: Record<string, number>;
  getCurrentColumnWidth: (columnId: string) => number;
  selectedProductIds: number[];
  columnsCount: number;
  visibleRows: Row<Product>[];
}

export const TableBody: React.FC<TableBodyProps> = ({
  isLoading,
  isAddingProduct,
  newProductData,
  addProduct,
  refreshProducts,
  setNewProductData,
  setIsAddingProduct,
  columnWidths,
  getCurrentColumnWidth,
  selectedProductIds,
  columnsCount,
  visibleRows,
}) => {
  const handleAddNewProduct = useCallback(async () => {
    if (
      !newProductData.title.trim() ||
      !newProductData.brand.trim() ||
      !newProductData.sku.trim() ||
      newProductData.price <= EDIT_CONFIG.PRICE_MIN
    ) {
      toast.error(ERROR_TEXTS.VALIDATION.ALL_FIELDS_REQUIRED);
      return;
    }

    try {
      await addProduct(newProductData);
      toast.success(SUCCESS_TEXTS.ADD_PRODUCT);
      setNewProductData(DEFAULT_NEW_PRODUCT);
      setIsAddingProduct(false);
      refreshProducts();
    } catch {
      toast.error(ERROR_TEXTS.ADD_PRODUCT);
    }
  }, [
    newProductData,
    addProduct,
    setNewProductData,
    setIsAddingProduct,
    refreshProducts,
  ]);

  return (
    <tbody>
      {isAddingProduct && (
        <AddProductForm
          newProduct={newProductData}
          onNewProductChange={setNewProductData}
          onSave={handleAddNewProduct}
          onCancel={() => setIsAddingProduct(false)}
          columnWidths={columnWidths}
          getColumnWidth={getCurrentColumnWidth}
        />
      )}

      {isLoading ? (
        <tr>
          <td colSpan={columnsCount} className="px-4 py-12 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <span className="text-gray-600 font-medium">
                {TABLE_TEXTS.LOADING}
              </span>
            </div>
          </td>
        </tr>
      ) : (
        visibleRows.map((row) => {
          const product = row.original;
          const isSelected = selectedProductIds.includes(product.id);
          return (
            <tr
              key={row.id}
              className={`relative border-b border-gray-100 hover:bg-gray-50 ${
                isSelected ? "border-l-[5px] border-l-[#3C538E]" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-4 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })
      )}
    </tbody>
  );
};
