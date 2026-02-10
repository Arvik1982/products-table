import type { Product } from ".";
import type { FIELD_TYPES } from "../constants/products";

export type EditableCellProps = {
  field: keyof Product;
  value: Product[keyof Product];
  editingValue?: Product[keyof Product];
  onChange: (data: Partial<Product>) => void;
  className?: string;
  type?: (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];
  shouldShowLowRatingWarning?: boolean;
};
export interface EditProductFormProps {
  product: Product;
  editData: Partial<Product>;
  onEditDataChange: (data: Partial<Product>) => void;
  onSave: () => void;
  onCancel: () => void;
  selectedProducts: number[];
  onToggleSelect: (id: number) => void;
  columnWidths: Record<string, number>;
  getColumnWidth: (columnId: string) => number;
}
export interface ProductRowProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (product: Product) => void;
  columnWidths: Record<string, number>;
  getColumnWidth: (columnId: string) => number;
}
