import { useMemo, useRef, useEffect } from "react";
import {
  COLUMN_CONFIGS,
  FIELD_TYPES,
  INITIAL_COLUMN_WIDTHS,
  TABLE_COLUMNS,
  TABLE_TEXTS,
} from "../constants/products";
import type { Product } from "../types";
import type { ColumnDef } from "@tanstack/react-table";
import { QuantityBars } from "../components/Products/QuantityBars";
import { PlusButton } from "../components/Products/PlusButton";
import { MoreButton } from "../components/Products/MoreButton";

interface UseTableColumnsProps {
  productsResponse?: { products?: Product[]; total?: number };
  selectedProductIds: number[];
  columnWidths: Record<string, number>;
  toggleSelectAllProducts: () => void;
  toggleProductSelection: (productId: number) => void;
  getCurrentColumnWidth: (columnId: string) => number;
}

export const useTableColumns = (props: UseTableColumnsProps) => {
  const {
    productsResponse,
    selectedProductIds,
    columnWidths,
    toggleSelectAllProducts,
    toggleProductSelection,
  } = props;

  // REF для indeterminate
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Состояние чекбокса
  const { isAllSelected, isIndeterminate } = useMemo(() => {
    const products = productsResponse?.products || [];
    const allSelected =
      products.length > 0 && selectedProductIds.length === products.length;
    const indeterminate =
      selectedProductIds.length > 0 &&
      selectedProductIds.length < products.length;

    return { isAllSelected: allSelected, isIndeterminate: indeterminate };
  }, [productsResponse, selectedProductIds]);

  // Эффект для обновления indeterminate состояния
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const columns = useMemo<ColumnDef<Product>[]>(() => {
    // Фабрика для создания простых колонок
    const createSimpleColumn = (
      fieldName: keyof Product,
      columnKey: string,
      columnHeader: string,
      options: {
        type?: (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];
        shouldShowLowRatingWarning?: boolean;
        maxWidth?: number;
        customCell?: (product: Product) => React.ReactNode;
      } = {},
    ): ColumnDef<Product> => {
      const size =
        columnWidths[columnKey] ||
        INITIAL_COLUMN_WIDTHS[
          columnKey as keyof typeof INITIAL_COLUMN_WIDTHS
        ] ||
        150;

      return {
        accessorKey: fieldName,
        id: fieldName as string,
        size,
        header: () => (
          <div className="text-base font-bold text-gray-400 text-center">
            {columnHeader}
          </div>
        ),
        cell: ({ row }) => {
          const product = row.original;

          // Если есть кастомная ячейка
          if (options.customCell) {
            return options.customCell(product);
          }

          // Простое отображение значения
          const value = product[fieldName];

          if (
            options.type === FIELD_TYPES.CURRENCY &&
            typeof value === "number"
          ) {
            return (
              <div className="font-mono text-base text-gray-900 text-center truncate px-2">
                {value.toLocaleString("ru-RU", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            );
          }

          if (
            options.type === FIELD_TYPES.NUMBER &&
            typeof value === "number"
          ) {
            const isLowRating = options.shouldShowLowRatingWarning && value < 3;
            return (
              <div
                className={`text-base text-center truncate px-2 ${
                  isLowRating ? "text-red-600 font-bold" : "text-gray-900"
                }`}
              >
                {value.toFixed(1)}/5
              </div>
            );
          }

          return (
            <div className="text-base text-gray-900 text-center truncate px-2">
              {String(value || "-")}
            </div>
          );
        },
      };
    };

    const productNameColumnSize =
      columnWidths[TABLE_COLUMNS.PRODUCT_NAME] ||
      INITIAL_COLUMN_WIDTHS[TABLE_COLUMNS.PRODUCT_NAME];

    const productNameColumn: ColumnDef<Product> = {
      id: TABLE_COLUMNS.PRODUCT_NAME,
      size: productNameColumnSize,
      header: () => (
        <div className="flex items-center h-full">
          <div className="flex items-center gap-4 w-full">
            <input
              ref={checkboxRef}
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAllProducts}
              className="w-5 h-5 border border-gray-300 rounded focus:ring-0 cursor-pointer"
            />
            <div className="text-base font-bold text-gray-400 text-center flex-1 min-w-0">
              {TABLE_TEXTS.COLUMN_HEADERS.PRODUCT_NAME}
            </div>
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const product = row.original;
        const isSelected = selectedProductIds.includes(product.id);

        return (
          <div className="flex items-center h-full">
            <div className="flex items-center gap-4 w-full">
              <div className="w-5 h-5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleProductSelection(product.id)}
                  className="w-full h-full border border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-base font-bold text-gray-900 truncate">
                    {product.title}
                  </div>
                  <div className="text-sm text-gray-400 truncate">
                    {product.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      },
    };

    // Остальные колонки
    const brandColumn = createSimpleColumn(
      "brand",
      TABLE_COLUMNS.BRAND,
      COLUMN_CONFIGS.brand?.header || "Бренд",
      {
        maxWidth: COLUMN_CONFIGS.brand?.maxWidth,
      },
    );

    const skuColumn = createSimpleColumn(
      "sku",
      TABLE_COLUMNS.SKU,
      COLUMN_CONFIGS.sku?.header || "SKU",
      {
        maxWidth: COLUMN_CONFIGS.sku?.maxWidth,
      },
    );

    const ratingColumn = createSimpleColumn(
      "rating",
      TABLE_COLUMNS.RATING,
      COLUMN_CONFIGS.rating?.header || "Рейтинг",
      {
        type: FIELD_TYPES.NUMBER,
        shouldShowLowRatingWarning: true,
        maxWidth: COLUMN_CONFIGS.rating?.maxWidth,
      },
    );

    const priceColumn = createSimpleColumn(
      "price",
      TABLE_COLUMNS.PRICE,
      COLUMN_CONFIGS.price?.header || "Цена",
      {
        type: FIELD_TYPES.CURRENCY,
        maxWidth: COLUMN_CONFIGS.price?.maxWidth,
      },
    );

    const stockColumn = createSimpleColumn(
      "stock",
      TABLE_COLUMNS.STOCK,
      COLUMN_CONFIGS.stock?.header || "Остаток",
      {
        maxWidth: COLUMN_CONFIGS.stock?.maxWidth,
        customCell: (product) => (
          <div className="flex justify-center">
            <QuantityBars stock={product.stock} />
          </div>
        ),
      },
    );

    // Колонка действий
    const actionsColumnSize =
      columnWidths[TABLE_COLUMNS.ACTIONS] ||
      INITIAL_COLUMN_WIDTHS[TABLE_COLUMNS.ACTIONS] ||
      120;

    const actionsColumn: ColumnDef<Product> = {
      id: TABLE_COLUMNS.ACTIONS,
      size: actionsColumnSize,
      header: () => <div className="text-base font-bold text-gray-400" />,
      cell: () => (
        <div className="flex justify-center items-center gap-8">
          <button
            className="hover:opacity-90 transition-opacity"
            title="Увеличить количество"
          >
            <PlusButton />
          </button>
          <button
            className="text-gray-400 hover:text-gray-500 transition-colors"
            title="Дополнительные действия"
          >
            <MoreButton />
          </button>
        </div>
      ),
    };

    return [
      productNameColumn,
      brandColumn,
      skuColumn,
      ratingColumn,
      priceColumn,
      stockColumn,
      actionsColumn,
    ];
  }, [
    isAllSelected,
    columnWidths,
    selectedProductIds,
    toggleSelectAllProducts,
    toggleProductSelection,
  ]);

  return columns;
};
