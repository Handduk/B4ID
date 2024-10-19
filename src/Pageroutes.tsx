import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./views/landingPage/LandingPage";
import { LoginPage } from "./views/loginPage/LoginPage";
import { ProfilePage } from "./views/profilePage/ProfilePage";

export const Pageroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};
