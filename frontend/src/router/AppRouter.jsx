import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";


function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </>
  );
}

export default AppRouter;