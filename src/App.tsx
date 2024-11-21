import { Navbar } from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { Pageroutes } from "./Pageroutes";

export const App = () => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Pageroutes />
      </UserProvider>
    </>
  );
};
