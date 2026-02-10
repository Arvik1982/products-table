import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import {
  Loader2,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ListFilter,
} from "lucide-react";
import toast from "react-hot-toast";
import type { ProductFormData } from "../../types";
import {
  useGetProductsQuery,
  useAddProductMutation,
} from "../../store/productsSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useTableColumns } from "../../hooks/useTableColumns";
import { SearchHeader } from "./SearchHeader";
import { AddProductForm } from "./AddProductForm";
import { Pagination } from "./Pagination";
import {
  TABLE_COLUMNS,
  INITIAL_COLUMN_WIDTHS,
  MINIMUM_COLUMN_WIDTHS,
  TABLE_TEXTS,
  PAGINATION_CONFIG,
  SEARCH_CONFIG,
  EDIT_CONFIG,
  DEFAULT_NEW_PRODUCT,
} from "../../constants/products";
import {
  ERROR_TEXTS,
  SUCCESS_TEXTS,
  TOOLTIP_TEXTS,
} from "../../constants/texts";
import { STORAGE_KEYS } from "../../storage/storage";
import { AppButton } from "../ui/AppButton";

interface ProductsTableProps {
  authToken?: string;
}

export const ProductsTable: React.FC<ProductsTableProps> = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [productIdBeingEdited, setProductIdBeingEdited] = useState<
    number | null
  >(null);

  const [skipCount, setSkipCount] = useState<number>(
    PAGINATION_CONFIG.DEFAULT_SKIP,
  );
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    INITIAL_COLUMN_WIDTHS,
  );
  const [columnBeingResized, setColumnBeingResized] = useState<string | null>(
    null,
  );
  const columnResizeRef = useRef({
    columnId: "",
    startX: 0,
    startWidth: 0,
  });
  const debouncedSearchValue = useDebounce(
    searchInputValue,
    SEARCH_CONFIG.DEBOUNCE_DELAY,
  );
  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    refetch: refreshProducts,
  } = useGetProductsQuery({
    limit: PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
    skip: skipCount,
    search: debouncedSearchValue,
    sortBy: sortingState.length > 0 ? sortingState[0].id : "",
    order:
      sortingState.length > 0 ? (sortingState[0].desc ? "desc" : "asc") : "asc",
  });
  const [addProduct] = useAddProductMutation();
  const [newProductData, setNewProductData] =
    useState<ProductFormData>(DEFAULT_NEW_PRODUCT);
  const handleSearchInputChange = (searchValue: string) => {
    setSearchInputValue(searchValue);
  };
  const handleColumnResizeStart = useCallback(
    (e: React.MouseEvent, columnId: string) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = columnWidths[columnId] || 150;

      columnResizeRef.current = { columnId, startX, startWidth };
      setColumnBeingResized(columnId);
      document.body.style.userSelect = "none";

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - columnResizeRef.current.startX;
        const minWidth =
          MINIMUM_COLUMN_WIDTHS[columnResizeRef.current.columnId] || 80;
        const newWidth = Math.max(
          columnResizeRef.current.startWidth + deltaX,
          minWidth,
        );

        setColumnWidths((prev) => ({
          ...prev,
          [columnResizeRef.current.columnId]: newWidth,
        }));
      };

      const handleMouseUp = () => {
        setColumnBeingResized(null);
        document.body.style.userSelect = "";
        setColumnWidths((prev) => {
          localStorage.setItem(
            STORAGE_KEYS.COLUMN_WIDTHS,
            JSON.stringify(prev),
          );
          return prev;
        });
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths],
  );

  const handleAddNewProduct = async () => {
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
      await addProduct(newProductData).unwrap();
      toast.success(SUCCESS_TEXTS.ADD_PRODUCT);
      setNewProductData(DEFAULT_NEW_PRODUCT);
      setIsAddingProduct(false);
      refreshProducts();
    } catch {
      toast.error(ERROR_TEXTS.ADD_PRODUCT);
    }
  };

  const toggleProductSelection = useCallback((productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const toggleSelectAllProducts = useCallback(() => {
    if (productsResponse?.products) {
      if (selectedProductIds.length === productsResponse.products.length) {
        setSelectedProductIds([]);
      } else {
        setSelectedProductIds(productsResponse.products.map((p) => p.id));
      }
    }
  }, [productsResponse, selectedProductIds]);

  const handleSortingStateChange = (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState),
  ) => {
    setSortingState((prev) => {
      const newSortingState =
        typeof updaterOrValue === "function"
          ? updaterOrValue(prev)
          : updaterOrValue;
      localStorage.setItem(
        STORAGE_KEYS.SORTING_STATE,
        JSON.stringify(newSortingState),
      );
      return newSortingState;
    });
  };

  useEffect(() => {
    const savedColumnWidths = localStorage.getItem(STORAGE_KEYS.COLUMN_WIDTHS);
    if (savedColumnWidths) setColumnWidths(JSON.parse(savedColumnWidths));

    const savedSortingState = localStorage.getItem(STORAGE_KEYS.SORTING_STATE);
    if (savedSortingState) setSortingState(JSON.parse(savedSortingState));
  }, []);

  const getCurrentColumnWidth = useCallback(
    (columnId: string) => columnWidths[columnId] || 150,
    [columnWidths],
  );

  const handlePageNumberChange = (pageNumber: number) => {
    setSkipCount((pageNumber - 1) * PAGINATION_CONFIG.DEFAULT_PAGE_SIZE);
    setSelectedProductIds([]);
    if (productIdBeingEdited) {
      setProductIdBeingEdited(null);
    }
  };

  useEffect(() => {
    setSkipCount(PAGINATION_CONFIG.DEFAULT_SKIP);
  }, [debouncedSearchValue]);

  const columns = useTableColumns({
    productsResponse,
    selectedProductIds,
    columnWidths,
    toggleSelectAllProducts,
    toggleProductSelection,
    getCurrentColumnWidth,
  });

  const productTable = useReactTable({
    data: productsResponse?.products || [],
    columns,
    state: { sorting: sortingState },
    onSortingChange: handleSortingStateChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalProductsCount = productsResponse?.total || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader
        searchQuery={searchInputValue}
        onSearchChange={handleSearchInputChange}
        isFetching={isFetchingProducts}
      />

      <div className="mx-8 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="font-['Inter'] font-bold text-[24px] leading-[45px] text-[#202020]">
                {TABLE_TEXTS.HEADER}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => refreshProducts()}
                  className="flex items-center justify-center p-2.5 w-10 h-10 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  title={TOOLTIP_TEXTS.REFRESH}
                >
                  <RefreshCw size={20} className="text-gray-700" />
                </button>
                <button
                  className="flex items-center justify-center p-2.5 w-10 h-10 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  title={TOOLTIP_TEXTS.FILTER}
                >
                  <ListFilter size={20} className="text-gray-700" />
                </button>
                <AppButton
                  onClick={() => setIsAddingProduct(true)}
                  icon="PlusCircle"
                  variant="primary"
                  size="md"
                  title={TOOLTIP_TEXTS.ADD_PRODUCT}
                >
                  {TABLE_TEXTS.ADD_PRODUCT}
                </AppButton>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{ minWidth: "100%" }}
            >
              <thead>
                {productTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-gray-200">
                    {headerGroup.headers.map((header) => {
                      const column = header.column;
                      const isColumnSorted = column.getIsSorted();
                      const columnId = column.id || "";
                      const columnWidth = getCurrentColumnWidth(columnId);

                      return (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-50 cursor-pointer select-none relative group"
                          style={{
                            width: `${columnWidth}px`,
                            position: "relative",
                          }}
                          onClick={column.getToggleSortingHandler()}
                        >
                          {columnId === TABLE_COLUMNS.PRODUCT_NAME ? (
                            <div className="flex items-center h-full">
                              <div className="flex items-center gap-4 w-full">
                                <div className="flex-shrink-0">
                                  {header.column.id ===
                                    TABLE_COLUMNS.PRODUCT_NAME &&
                                    flexRender(
                                      column.columnDef.header,
                                      header.getContext(),
                                    )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 justify-center w-full">
                              {flexRender(
                                column.columnDef.header,
                                header.getContext(),
                              )}
                              <div className="inline-flex items-center">
                                {isColumnSorted === "asc" && (
                                  <ChevronUp size={16} />
                                )}
                                {isColumnSorted === "desc" && (
                                  <ChevronDown size={16} />
                                )}
                              </div>
                            </div>
                          )}

                          {columnId !== TABLE_COLUMNS.ACTIONS && (
                            <div
                              className={`absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none ${
                                columnBeingResized === columnId
                                  ? "bg-blue-500"
                                  : "hover:bg-blue-400"
                              }`}
                              onMouseDown={(e) =>
                                handleColumnResizeStart(e, columnId)
                              }
                              style={{ cursor: "col-resize" }}
                              title={TOOLTIP_TEXTS.RESIZE_COLUMN}
                            />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
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

                {isLoadingProducts ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2
                          className="animate-spin text-blue-600"
                          size={40}
                        />
                        <span className="text-gray-600 font-medium">
                          {TABLE_TEXTS.LOADING}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  productTable.getRowModel().rows.map((row) => {
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
                          <td
                            key={cell.id}
                            className="px-4 py-4 text-sm text-gray-700"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-200">
            <Pagination
              skip={skipCount}
              limit={PAGINATION_CONFIG.DEFAULT_PAGE_SIZE}
              total={totalProductsCount}
              isLoading={isLoadingProducts}
              onPageChange={handlePageNumberChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
