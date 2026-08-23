import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const storedToken = localStorage.getItem("accessToken");
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedToken || null,
  status: "idle",
  error: null,
};

/*
==================================================
LOGIN
==================================================
*/

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");

      const user = response.data.find(
        (u) =>
          u.email === email &&
          u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      /*
      Check the selected account type.
      */

      if (user.role !== role) {
        throw new Error(
          `This account is registered as a ${
            user.role || "user"
          }.`
        );
      }

      return {
        accessToken: "mock-token",
        user,
      };
    } catch (err) {
      return rejectWithValue(
        err.message || "Invalid email or password"
      );
    }
  }
);

/*
==================================================
REGISTER
==================================================
*/

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (
    { email, password, role },
    { rejectWithValue }
  ) => {
    try {
      const existingUsers = await api.get("/users");

      const emailExists = existingUsers.data.some(
        (u) => u.email === email
      );

      if (emailExists) {
        throw new Error("Email already exists");
      }

      const response = await api.post("/users", {
        email,
        password,
        role,
      });

      return {
        accessToken: "mock-token",
        user: response.data,
      };
    } catch (err) {
      return rejectWithValue(
        err.message ||
          "Could not register. Try a different email."
      );
    }
  }
);

/*
==================================================
AUTH SLICE
==================================================
*/

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },

    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      LOGIN
      */

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;

        localStorage.setItem(
          "accessToken",
          action.payload.accessToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /*
      REGISTER
      */

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.accessToken =
            action.payload.accessToken;

          state.user = action.payload.user;

          localStorage.setItem(
            "accessToken",
            action.payload.accessToken
          );

          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.user)
          );
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const {
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;