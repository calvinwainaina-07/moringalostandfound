import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser, clearAuthError } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  return (
    <div className="auth-page">
      <AuthForm mode="login" onSubmit={handleLogin} status={status} error={error} />
      <p>
        No account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}