import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerUser, clearAuthError } from "../features/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleRegister = (credentials) => {
    dispatch(registerUser(credentials));
  };

  return (
    <div className="auth-page">
      <AuthForm mode="register" onSubmit={handleRegister} status={status} error={error} />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}