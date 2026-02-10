import React from "react";
import { Search, Loader2, Globe, Bell, Mail, Filter } from "lucide-react";

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
    <div className="bg-white rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] mx-8 mt-8">
      <div className="px-8 py-0">
        <div className="flex items-center justify-between h-20">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Товары</h1>
          </div>

          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-2xl">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border focus:border-blue-500 transition-all"
                />
                {isFetching && (
                  <Loader2
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin text-blue-600"
                    size={20}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center">
              <div className="h-8 w-[1px] bg-gray-300 mx-6"></div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Globe size={24} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell size={24} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Mail size={24} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
