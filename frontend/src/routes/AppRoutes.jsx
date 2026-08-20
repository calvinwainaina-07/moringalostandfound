import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Placeholder = ({ title }) => <h1>{title}</h1>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Placeholder title="Home" />} />
          <Route path="/report-lost" element={<Placeholder title="Report Lost" />} />
          <Route path="/report-found" element={<Placeholder title="Report Found" />} />
          <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}