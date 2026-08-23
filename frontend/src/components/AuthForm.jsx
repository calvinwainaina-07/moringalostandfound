import { useState } from "react";

export default function AuthForm({ mode, onSubmit, status, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const isLoading = status === "loading";
  const isRegister = mode === "register";

  const validate = () => {
    if (!email.trim()) return "Email is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter a valid email";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (isRegister && password !== confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    if (err) {
      setValidationError(err);
      return;
    }

    setValidationError("");
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md rounded-3xl border border-[#263437] bg-[#2C2D32] p-7 shadow-2xl"
    >
      {/* Logo */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B62779] text-2xl font-bold text-white shadow-lg">
          L&F
        </div>

        <h2 className="text-3xl font-bold text-white">
          {isRegister ? "Create an account" : "Welcome back"}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          {isRegister
            ? "Join the Moringa Lost & Found community"
            : "Login to your Lost & Found account"}
        </p>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-[#263437] bg-[#1B4B4B] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your password"
          className="w-full rounded-xl border border-[#263437] bg-[#1B4B4B] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30"
        />
      </div>

      {/* Confirm password */}
      {isRegister && (
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Confirm your password"
            className="w-full rounded-xl border border-[#263437] bg-[#1B4B4B] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30"
          />
        </div>
      )}

      {/* Error */}
      {(validationError || error) && (
        <div className="mb-5 rounded-xl border border-[#5A293C] bg-[#5A293C]/40 px-4 py-3 text-sm text-pink-200">
          {validationError || error}
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-[#B62779] px-4 py-3 font-bold text-white shadow-lg transition hover:scale-[1.01] hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Please wait..."
          : isRegister
          ? "Create Account"
          : "Login"}
      </button>
    </form>
  );
}