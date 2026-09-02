import { useState } from "react";

export default function AuthForm({
  mode,
  onSubmit,
  status,
  error,
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [validationError, setValidationError] = useState("");

  const isLoading = status === "loading";
  const isRegister = mode === "register";

  const validate = () => {
    if (!email.trim()) {
      return "Email is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter a valid email";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (isRegister && name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }

    if (isRegister && password !== confirmPassword) {
      return "Passwords do not match";
    }

    if (!role) {
      return "Please select an account type";
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

    onSubmit({
      name: name.trim(),
      email,
      password,
      role,
    });
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
          {isRegister
            ? "Create an account"
            : "Welcome back"}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          {isRegister
            ? "Join the Moringa Lost & Found community"
            : "Login to your Lost & Found account"}
        </p>
      </div>

      {/* Email */}
      {isRegister && (
        <div className="mb-5">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-200">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-[#263437] bg-[#1B4B4B] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30"
          />
        </div>
      )}

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

      {/* Confirm Password */}
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
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            disabled={isLoading}
            placeholder="Confirm your password"
            className="w-full rounded-xl border border-[#263437] bg-[#1B4B4B] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30"
          />
        </div>
      )}

      <div className="mb-5">
        <p className="mb-3 text-sm font-medium text-gray-200">
          Account Type
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("user")}
            disabled={isLoading}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              role === "user"
                ? "border-[#B62779] bg-[#B62779] text-white"
                : "border-[#263437] bg-[#1B4B4B] text-gray-300 hover:border-[#B62779]"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            disabled={isLoading}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              role === "admin"
                ? "border-[#B62779] bg-[#B62779] text-white"
                : "border-[#263437] bg-[#1B4B4B] text-gray-300 hover:border-[#B62779]"
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Error */}
      {(validationError || error) && (
        <div className="mb-5 rounded-xl border border-[#5A293C] bg-[#5A293C]/40 px-4 py-3 text-sm text-pink-200">
          {validationError || error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-[#B62779] px-4 py-3 font-bold text-white shadow-lg transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
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
