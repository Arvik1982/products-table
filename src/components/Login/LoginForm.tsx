import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Icons from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setRemember, useLoginMutation } from "../../store/authSlice";
import type { RootState } from "../../store";
import toast from "react-hot-toast";
import { schema } from "../../constants/schemas";
import type { FormData } from "../../types";
import { LOGIN_PATHS } from "../../constants/paths";
import { ERROR_TEXTS, LOGIN_TEXTS } from "../../constants/texts";
import { AppInput } from "../ui/AppInput";
import storage from "../../storage/storage";
import { defaultLoginValues } from "../../constants/defaults";
import { AppCheckbox } from "../ui/AppCheckbox";
import { LoginContainer } from "./LoginContainer";
import { AppButton } from "../ui/AppButton";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const remember = useSelector((state: RootState) => state.auth.remember);
  const [login, { isLoading }] = useLoginMutation();

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    setFocus,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaultLoginValues,
  });

  const usernameValue = watch(LOGIN_PATHS.USERNAME);
  const passwordValue = watch(LOGIN_PATHS.PASSWORD);

  useEffect(() => {
    const savedData = storage.loadLoginData();
    if (savedData.username && remember) {
      setValue(LOGIN_PATHS.USERNAME, savedData.username, {
        shouldValidate: true,
      });
    }
    if (savedData.password && remember) {
      setValue(LOGIN_PATHS.PASSWORD, savedData.password, {
        shouldValidate: true,
      });
    }
  }, [remember, setValue]);

  useEffect(() => {
    setFocus(LOGIN_PATHS.USERNAME);
  }, [setFocus]);

  const onSubmit = async (data: FormData) => {
    try {
      setServerError("");
      toast.loading("Авторизация...", { id: "login" });

      const result = await login({
        username: data.username,
        password: data.password,
        expiresInMins: remember ? 1440 : 30,
      }).unwrap();

      toast.dismiss("login");

      if (remember) {
        storage.saveLoginData(data.username, data.password);
      } else {
        storage.clearLoginData();
      }

      dispatch(
        setToken({
          token: result.accessToken,
          user: {
            id: result.id,
            username: result.username,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            image: result.image,
            gender: result.gender,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          },
          remember,
        }),
      );

      reset();
    } catch (error) {
      // TODO: Обработка ошибок
      console.error("Login error:", error);
      toast.dismiss("login");
      const errorMessage = "Ошибка авторизации";
      setServerError(errorMessage);
      toast.error(errorMessage, { duration: 5000 });
    }
  };

  return (
    <LoginContainer>
      <form
        className="space-y-5 !mb-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Mail */}
        <AppInput
          label={LOGIN_TEXTS.usermail}
          leftIcon={Icons.Mail}
          value={usernameValue}
          onChange={(e) =>
            setValue(LOGIN_PATHS.USERNAME, e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder={LOGIN_TEXTS.usermail}
          autoComplete="username"
          disabled={isLoading}
          error={errors.username?.message}
          clearable={true}
          aria-invalid={!!errors.username}
        />

        {/* Password */}
        <AppInput
          label={LOGIN_TEXTS.password}
          leftIcon={Icons.Lock}
          type="password"
          value={passwordValue}
          onChange={(e) =>
            setValue(LOGIN_PATHS.PASSWORD, e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder={LOGIN_TEXTS.password}
          autoComplete="current-password"
          disabled={isLoading}
          error={errors.password?.message}
          clearable={false}
          showPasswordToggle={true}
          isPasswordVisible={showPassword}
          onPasswordToggle={() => setShowPassword(!showPassword)}
          aria-invalid={!!errors.password}
        />

        <AppCheckbox
          id="remember"
          label={LOGIN_TEXTS.remember}
          checked={remember}
          onChange={(e) => dispatch(setRemember(e.target.checked))}
          disabled={isLoading}
        />
        <AppButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={!isValid}
          loadingText="Выполняется вход..."
        >
          {LOGIN_TEXTS.signIn}
        </AppButton>
      </form>
      {serverError && (
        <div className="z-100 absolute bottom-[60px] left-1/2 transform -translate-x-1/2 animate-fadeIn bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-2 rounded-lg shadow-lg min-w-[300px]">
          <div className="flex items-center">
            <Icons.AlertCircle
              className="text-red-500 mr-3 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-red-800 font-medium">{serverError}</p>
              <p className="text-red-600 text-sm ">{ERROR_TEXTS.err_retry}</p>
            </div>
          </div>
        </div>
      )}
    </LoginContainer>
  );
};
