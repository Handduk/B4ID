import { useState } from "react";
import { RegisterUser, signIn } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

interface UserProps {
  sureName: string;
  lastName: string;
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const defaultUser: UserProps = {
    sureName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [login, setLogin] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps>(defaultUser);
  const [confirmPw, setConfirmPw] = useState<boolean>(false);
  const [registeredUser, setRegisteredUser] = useState<boolean>(true);
  const { getUser } = useUserContext();

  const setView = (choice: string) => {
    if (choice === "register") {
      setLogin(false);
      setUser((prev) => ({
        ...prev,
        username: "",
      }));
      setRegisteredUser(true);
    } else if (choice === "login") {
      setLogin(true);
    }
  };

  const setUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPw(e.target.value === user.password);
  };

  const signInUser = async () => {
    const userId = await signIn(user.email, user.password);
    if (userId) {
      getUser(userId.uid);
      setTimeout(() => navigate("/"), 0);
    } else {
      setRegisteredUser(false);
    }
  };

  const checkRegisterUser = async () => {
    const regex = user.email.includes(".") && user.email.includes("@");
    if (
      user.email.length > 0 &&
      regex &&
      user.password.length >= 6 &&
      confirmPw
    ) {
      const name = `${user.sureName} ${user.lastName}`;
      const isRegistered = await RegisterUser(user.email, user.password, name);
      if (isRegistered === user.email) {
        setUser(defaultUser);
        setLogin(true);
      }
    } else console.log("NO");
  };

  return (
    <div
      className="h-[calc(100vh-4rem)] w-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 
    flex items-center max-laptop:justify-center"
    >
      <div
        className="h-4/5 w-2/5 flex flex-row transition-all duration-300
      max-tablet:w-full max-tablet:h-4/5 max-laptop:h-4/5 max-laptop:w-3/5 max-mobile:h-full"
      >
        <div
          className="w-full h-full bg-yellow-400 flex flex-col rounded-2xl ms-36 shadow-[0_0_35px_5px_rgba(250,204,21,0.4)]
         max-laptop:mt-0 max-laptop:ms-0 max-tablet:rounded-none max-tablet:shadow-none max-laptop:rounded-xl"
        >
          <span className="w-full h-1/6 flex justify-between shadow-xl shadow-neutral-900/15">
            <button
              className="w-1/2 border-b border-neutral-900 flex justify-center items-center text-2xl cursor-pointer rounded-tl-2xl 
              hover:bg-yellow-500 transition-all duration-300 dark:text-neutral-900"
              onClick={() => setView("login")}
            >
              <b>Login</b>
            </button>
            <button
              className="w-1/2 border-b border-l border-neutral-900 flex justify-center items-center text-2xl cursor-pointer rounded-tr-2xl
              hover:bg-yellow-500 transition-all duration-300 dark:text-neutral-900"
              onClick={() => setView("register")}
            >
              <b>Register</b>
            </button>
          </span>
          <span className="w-full h-[calc(100%-16.666667%)] rounded-b-xl flex flex-col items-center">
            {login ? (
              <>
                <div className="w-5/6 h-4/6 mt-12 text-neutral-900">
                  <p className="ms-1 mb-1 text-xl">Email:</p>
                  <input
                    className="w-full h-12 text-lg bg-neutral-800 border border-neutral-950 hover:border-neutral-400 transition-colors duration-150 px-2 rounded-md
                  text-neutral-200"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUserInfo(e)}
                    required
                  />
                  <p className="ms-1 mb-1 text-xl">Password:</p>
                  <input
                    className="w-full h-12 text-lg bg-neutral-800 border border-neutral-950 hover:border-neutral-400 transition-colors duration-150 px-2 rounded-md
                  text-neutral-200"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUserInfo(e)}
                    required
                  />
                  {!registeredUser && (
                    <div className="text-xl text-red-600 mt-6 flex space-x-2">
                      <p>Incorrect email or password.</p>
                      <a href="" className="underline">
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
                <div className="w-full h-1/6 flex justify-center items-center">
                  <button
                    className="w-48 h-16 border border-neutral-900 rounded-lg bg-neutral-800 text-neutral-200 
         hover:text-yellow-400 hover:shadow-[0_0_15px_5px_rgba(23,23,23,0.4)] transition-all duration-300
        disabled:bg-transparent disabled:hover:text-neutral-900 disabled:hover:shadow-none"
                    onClick={() => signInUser()}
                  >
                    <strong>Login</strong>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-5/6 h-5/6 mt-4 text-neutral-900 max-mobile:h-full">
                  <div className="w-full flex justify-between max-laptop:hidden">
                    <p className="ms-1 mb-1 w-1/2 text-xl">Surename:</p>
                    <p className="ms-3 mb-1 w-1/2 text-xl">Last name:</p>
                  </div>
                  <div className="flex max-laptop:flex-col max-laptop:w-full">
                    <p className="ms-1 mb-1 text-xl laptop:hidden">Surename:</p>
                    <input
                      className="w-1/2 h-12 me-1 text-lg bg-neutral-200 border border-neutral-400 hover:border-neutral-800 transition-colors duration-150 px-2 rounded-md
                  dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-950 dark:hover:border-neutral-400 max-laptop:w-full"
                      type="text"
                      name="sureName"
                      onChange={(e) => setUserInfo(e)}
                    />

                    <p className="ms-1 mb-1 text-xl laptop:hidden">
                      Last name:
                    </p>
                    <input
                      className="w-1/2 h-12 ms-1 text-lg bg-neutral-200 border border-neutral-400 hover:border-neutral-800 transition-colors duration-150 px-2 rounded-md
                  dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-950 dark:hover:border-neutral-400 max-laptop:w-full max-laptop:ms-0"
                      type="text"
                      name="lastName"
                      onChange={(e) => setUserInfo(e)}
                    />
                  </div>
                  <p className="ms-1 mb-1 text-xl">Email:</p>
                  <input
                    className="w-full h-12 text-lg bg-neutral-200 border border-neutral-400 hover:border-neutral-800 transition-colors duration-150 px-2 rounded-md
                  dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-950 dark:hover:border-neutral-400"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUserInfo(e)}
                    required
                  />
                  <p className="ms-1 mb-1 text-xl">Password:</p>
                  <input
                    className="w-full h-12 text-lg bg-neutral-200 border border-neutral-400 hover:border-neutral-800 transition-colors duration-150 px-2 rounded-md
                  dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-950 dark:hover:border-neutral-400"
                    type="password"
                    name="password"
                    onChange={(e) => setUserInfo(e)}
                    required
                  />
                  <p className="ms-1 mb-1 text-xl">Confirm password:</p>
                  <input
                    className={`w-full h-12 text-lg bg-neutral-200 border border-neutral-400 hover:border-neutral-800 transition-colors duration-150 px-2 rounded-md
                  dark:bg-neutral-800 dark:border-neutral-950 dark:hover:border-neutral-400 ${
                    !confirmPw ? "dark:text-red-500" : "dark:text-neutral-200"
                  }`}
                    type="password"
                    name="passwordConfirm"
                    onChange={(e) => confirmPassword(e)}
                    required
                  />
                </div>
                <div className="w-full h-1/6 flex justify-center items-center">
                  <button
                    className="w-48 h-16 border border-neutral-900 rounded-lg bg-neutral-800 text-neutral-200 
         hover:text-yellow-400 hover:shadow-[0_0_15px_5px_rgba(23,23,23,0.4)] transition-all duration-300
         disabled:text-neutral-600
         disabled:hover:text-neutral-600 disabled:hover:shadow-none"
                    onBlur={() => checkRegisterUser()}
                  >
                    <strong>Register</strong>
                  </button>
                </div>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
