import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome{user?.email ? `, ${user.email}` : ""} 👋</h1>
      <p>You're logged in to Moringa Lost & Found.</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}