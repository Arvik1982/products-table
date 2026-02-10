import React from "react";
import {
  Search,
  Loader2,
  Globe,
  Bell,
  Mail,
  SlidersVertical,
} from "lucide-react";
import { TABLE_TEXTS } from "../../constants/products";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isFetching: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  isFetching,
}) => {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] mx-4 sm:mx-6 md:mx-8 mt-8">
      <div className="px-4 sm:px-6 md:px-8 py-0">
        <div className="flex flex-wrap items-center justify-between gap-4 min-h-[80px] md:min-h-[100px]">
          {/* Заголовок */}
          <div className="min-w-[100px] flex-shrink-0">
            <h1 className="font-['Inter'] font-bold text-[24px] leading-[45px] text-[#202020]">
              {TABLE_TEXTS.PRODUCTS}
            </h1>
          </div>

          {/* Центральная часть с поиском */}
          <div className="flex-grow flex justify-center min-w-[300px]">
            <div className="w-full max-w-[1023px]">
              <div className="flex items-center p-3 bg-[#F3F3F3] rounded-[8px] h-[48px] w-full">
                <Search className="text-[#999999] flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full ml-3 bg-transparent border-0 focus:outline-none text-sm placeholder:text-[#999999] text-gray-900"
                />
                {isFetching && (
                  <Loader2
                    className="animate-spin text-[#999999] ml-2 flex-shrink-0"
                    size={20}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Правая часть с иконками */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              {/* Разделитель */}
              <div className="hidden sm:block h-14 w-[1px] bg-[#C2C2C2] opacity-50 rounded-[8px] mx-4 sm:mx-6"></div>

              {/* Иконки */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-[30px]">
                <button className="p-1 sm:p-2 text-[#878787] hover:text-[#202020] hover:bg-gray-100 rounded-lg transition-colors">
                  <Globe size={24} className="sm:w-[28px] sm:h-[28px]" />
                </button>
                <button className="p-1 sm:p-2 text-[#878787] hover:text-[#202020] hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell size={24} className="sm:w-[28px] sm:h-[28px]" />
                  {/* Бейдж уведомлений */}
                  <div className="absolute left-4 sm:left-5 top-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#797FE9] border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        12
                      </span>
                    </div>
                  </div>
                </button>
                <button className="p-1 sm:p-2 text-[#878787] hover:text-[#202020] hover:bg-gray-100 rounded-lg transition-colors">
                  <Mail size={24} className="sm:w-[28px] sm:h-[28px]" />
                </button>
                <button className="p-1 sm:p-2 text-[#878787] hover:text-[#202020] hover:bg-gray-100 rounded-lg transition-colors">
                  <SlidersVertical
                    size={24}
                    className="sm:w-[28px] sm:h-[28px]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
