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
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      // Make sure the selected role matches
      // the role returned by the backend.
      if (role && data.user.role !== role) {
        throw new Error(
          `This account is registered as a ${data.user.role}.`
        );
      }

      return {
        accessToken: data.access_token,
        user: data.user,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail ||
        err.message ||
        "Invalid email or password"
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

  async ({ email, password, name, role }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        name,
        role,
      });

      /*
      Your backend registration currently creates
      the account. We don't assume it logs the user
      in automatically.
      */

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail ||
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

      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
