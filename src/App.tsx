import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { LoginForm } from "./components/Login/LoginForm";
import { ProductsTable } from "./components/Products/ProductsTable";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store";
import { restoreSession } from "./store/authSlice";

function App() {
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {isAuthenticated ? <ProductsTable authToken={token} /> : <LoginForm />}
    </>
  );
}

export default App;
