import type { Product } from ".";

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
