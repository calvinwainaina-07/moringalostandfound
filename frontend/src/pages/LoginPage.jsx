import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser, clearAuthError } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, accessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1B4B4B] px-6 py-8">
      <div className="w-full max-w-md">
        <AuthForm
          mode="login"
          onSubmit={handleLogin}
          status={status}
          error={error}
        />

        <p className="mt-5 text-center text-sm text-gray-300">
          No account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#B62779] hover:text-pink-300 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}