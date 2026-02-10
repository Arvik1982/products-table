import React from "react";
import { Check, X } from "lucide-react";
import type { ProductFormData } from "../../types";

interface AddProductFormProps {
  newProduct: ProductFormData;
  onNewProductChange: (product: ProductFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  columnWidths: Record<string, number>;
  getColumnWidth: (columnId: string) => number;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  newProduct,
  onNewProductChange,
  onSave,
  onCancel,
  getColumnWidth,
}) => {
  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number,
  ) => {
    onNewProductChange({
      ...newProduct,
      [field]: value,
    });
  };

  return (
    <tr className="border-b border-blue-100 bg-blue-50">
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("select")}px` }}
      >
        <div className="flex items-center h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-5 h-5 flex-shrink-0">
              <input
                type="checkbox"
                className="w-full h-full border border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Наименование*"
                  className="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 truncate"
                />
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  placeholder="Категория"
                  className="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm truncate"
                />
              </div>
            </div>
          </div>
        </div>
      </td>

      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("brand")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="text"
            value={newProduct.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            placeholder="Вендор*"
            className="w-full max-w-[120px] px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center truncate"
          />
        </div>
      </td>

      <td className="px-4 py-3" style={{ width: `${getColumnWidth("sku")}px` }}>
        <div className="flex justify-center">
          <input
            type="text"
            value={newProduct.sku}
            onChange={(e) => handleInputChange("sku", e.target.value)}
            placeholder="Артикул*"
            className="w-full max-w-[120px] px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center truncate"
          />
        </div>
      </td>

      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("rating")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="number"
            value={newProduct.rating || ""}
            onChange={(e) =>
              handleInputChange("rating", parseFloat(e.target.value) || 0)
            }
            placeholder="Оценка"
            className="w-full max-w-[80px] px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center truncate"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
      </td>

      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("price")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="number"
            value={newProduct.price || ""}
            onChange={(e) =>
              handleInputChange("price", parseFloat(e.target.value) || 0)
            }
            placeholder="Цена*"
            className="w-full max-w-[100px] px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono truncate"
            min="0"
            step="0.01"
          />
        </div>
      </td>

      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("stock")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="number"
            value={newProduct.stock || ""}
            onChange={(e) =>
              handleInputChange("stock", parseInt(e.target.value) || 0)
            }
            placeholder="Количество"
            className="w-full max-w-[80px] px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center truncate"
            min="0"
          />
        </div>
      </td>

      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("actions")}px` }}
      >
        <div className="flex gap-2 justify-center">
          <button
            onClick={onSave}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <Check size={16} />
            <span>Сохранить</span>
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            <X size={16} />
            <span>Отмена</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
