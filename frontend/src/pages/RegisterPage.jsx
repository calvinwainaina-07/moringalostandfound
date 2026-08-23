import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerUser, clearAuthError } from "../features/auth/authSlice";

export default function RegisterPage() {
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

  const handleRegister = (credentials) => {
    dispatch(registerUser(credentials));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1B4B4B] px-4 py-8">
      <div className="w-full max-w-md">
        <AuthForm
          mode="register"
          onSubmit={handleRegister}
          status={status}
          error={error}
        />

        <p className="mt-5 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#B62779] hover:text-pink-300 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}