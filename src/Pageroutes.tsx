import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./views/landingPage/LandingPage";
import { LoginPage } from "./views/loginPage/LoginPage";
import { ProfilePage } from "./views/profilePage/ProfilePage";
import { SetupPage } from "./views/setupPage/SetupPage";

export const Pageroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route />
      </Routes>
    </>
  );
};
