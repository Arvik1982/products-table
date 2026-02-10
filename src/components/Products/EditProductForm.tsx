import React from "react";
import { Check, X } from "lucide-react";
import type { Product } from "../../types";
import type { EditProductFormProps } from "../../types/tableTypes";

export const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  editData,
  onEditDataChange,
  onSave,
  onCancel,
  selectedProducts,
  onToggleSelect,

  getColumnWidth,
}) => {
  const handleInputChange = (field: keyof Product, value: string | number) => {
    onEditDataChange({
      ...editData,
      [field]: value,
    });
  };

  return (
    <>
      {/* Колонка Наименование */}
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("select")}px` }}
      >
        <div className="flex items-center h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-5 h-5 flex-shrink-0">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => onToggleSelect(product.id)}
                className="w-full h-full border border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex flex-col flex-1 min-w-0">
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 truncate"
                  placeholder="Наименование"
                />
                <input
                  type="text"
                  value={editData.category || ""}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 text-sm truncate"
                  placeholder="Категория"
                />
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* Колонка Вендор */}
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("brand")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="text"
            value={editData.brand || ""}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            className="w-full max-w-[120px] px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center truncate"
            placeholder="Вендор"
          />
        </div>
      </td>

      {/* Колонка Артикул */}
      <td className="px-4 py-3" style={{ width: `${getColumnWidth("sku")}px` }}>
        <div className="flex justify-center">
          <input
            type="text"
            value={editData.sku || ""}
            onChange={(e) => handleInputChange("sku", e.target.value)}
            className="w-full max-w-[120px] px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center truncate"
            placeholder="Артикул"
          />
        </div>
      </td>

      {/* Колонка Оценка */}
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("rating")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="number"
            value={editData.rating || product.rating}
            onChange={(e) =>
              handleInputChange("rating", parseFloat(e.target.value) || 0)
            }
            className={`w-full max-w-[80px] px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center truncate ${
              (editData.rating || product.rating) < 3 ? "text-red-600" : ""
            }`}
            min="0"
            max="5"
            step="0.1"
          />
        </div>
      </td>

      {/* Колонка Цена */}
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("price")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="number"
            value={editData.price || product.price}
            onChange={(e) =>
              handleInputChange("price", parseFloat(e.target.value) || 0)
            }
            className="w-full max-w-[100px] px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center font-mono truncate"
            min="0"
            step="0.01"
          />
        </div>
      </td>

      {/* Колонка Количество */}
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("stock")}px` }}
      >
        <div className="flex justify-center">
          <input
            type="number"
            value={editData.stock || product.stock}
            onChange={(e) =>
              handleInputChange("stock", parseInt(e.target.value) || 0)
            }
            className="w-full max-w-[80px] px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center truncate"
            min="0"
          />
        </div>
      </td>

      {/* Колонка Действия */}
      <td
        className="px-4 py-3"
        style={{ width: `${getColumnWidth("actions")}px` }}
      >
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={onSave}
            className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
            title="Сохранить"
          >
            <Check size={18} />
          </button>
          <button
            onClick={onCancel}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Отмена"
          >
            <X size={18} />
          </button>
        </div>
      </td>
    </>
  );
};
