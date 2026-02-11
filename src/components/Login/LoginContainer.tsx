import type { ReactNode } from "react";
import { LOGIN_TEXTS } from "../../constants/texts";
import logo from "@/assets/logo.png";

type Props = { children: ReactNode };
export const LoginContainer = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="max-w-[527px] w-full max-h-[704px] bg-gradient-to-b from-white to-white rounded-[40px] shadow-2xl p-2">
        <div className="p-12 space-y-8 rounded-[34px] bg-gradient-to-b from-gray-50 to-white">
          <div
            className="w-[60px] h-[60px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto"
            style={{
              // backgroundImage: `url('src/assets/logo.png')`,
              backgroundImage: `url(${logo})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="text-center space-y-4">
            <div>
              <h1 className="font-inter font-semibold text-2xl mt-2 leading-[110%] tracking-tight text-[#232323]">
                {LOGIN_TEXTS.welcome}
              </h1>

              <p className="font-inter font-medium text-[18px] leading-[150%] mt-2 bg-gradient-to-b from-gray-400 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                {LOGIN_TEXTS.pleaseLogin}
              </p>
            </div>
          </div>

          {children}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white rounded-[50px]">
                <span className=" bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent font-medium text-[16px]">
                  ИЛИ
                </span>
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="font-inter text-sm leading-[150%] text-[#6C6C6C]">
              Нет аккаунта?{" "}
              <button
                type="button"
                className="font-inter font-semibold text-[#242EDB] hover:text-blue-500 transition-colors"
              >
                {LOGIN_TEXTS.create}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
