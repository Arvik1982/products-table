import {
  EDIT_CONFIG,
  FIELD_TYPES,
  TABLE_COLUMNS,
} from "../../constants/products";
import type { EditableCellProps } from "../../types/tableTypes";

export const EditableCell: React.FC<EditableCellProps> = ({
  field,
  value,
  editingValue,
  onChange,
  className = "",
  type = FIELD_TYPES.TEXT,
  shouldShowLowRatingWarning = false,
}) => {
  const isEditing = editingValue !== undefined;

  const formatDisplayValue = (): string | number => {
    if (type === FIELD_TYPES.CURRENCY && typeof value === "number") {
      return value.toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else if (type === FIELD_TYPES.NUMBER && typeof value === "number") {
      return `${value.toFixed(1)}/5`;
    }
    return value as string | number;
  };

  const parseInputValue = (inputValue: string): string | number => {
    if (type === FIELD_TYPES.NUMBER) {
      return parseFloat(inputValue) || 0;
    }
    return inputValue;
  };

  if (!isEditing) {
    const displayValue = formatDisplayValue();
    const isLowRating =
      type === FIELD_TYPES.NUMBER &&
      shouldShowLowRatingWarning &&
      typeof value === "number" &&
      value < EDIT_CONFIG.LOW_RATING_THRESHOLD;

    return (
      <div
        className={`text-base text-center truncate px-2 font-mono ${
          isLowRating ? "text-red-600 font-bold" : "text-gray-900"
        } ${className}`}
      >
        {displayValue}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <input
        type={type === FIELD_TYPES.NUMBER ? "number" : "text"}
        value={(editingValue as string | number) ?? ""}
        onChange={(e) => {
          const newValue = parseInputValue(e.target.value);
          onChange({ [field]: newValue });
        }}
        className={`w-full max-w-[120px] px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center truncate ${className}`}
        min={
          type === FIELD_TYPES.NUMBER
            ? EDIT_CONFIG.PRICE_MIN.toString()
            : undefined
        }
        max={
          field === TABLE_COLUMNS.RATING
            ? EDIT_CONFIG.RATING_MAX.toString()
            : undefined
        }
        step={
          field === TABLE_COLUMNS.RATING
            ? "0.1"
            : field === TABLE_COLUMNS.PRICE
              ? "0.01"
              : undefined
        }
      />
    </div>
  );
};
