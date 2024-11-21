import { useEffect, useRef, useState } from "react";
import { User } from "../../models/User";
import { useUserContext } from "../../context/UserContext";

export const ProfilePage = () => {
  const [isEdited, setIsEdited] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { user, setUser, setNewUser, updateUser } = useUserContext();
  const ogUser = useRef<User>(user as User).current;

  useEffect(() => {
    if (user) {
      setIsEdited(ogUser.birth !== user.birth || ogUser.name !== user.name);
    }
  }, [user]);

  const getFormattedDate = () => {
    if (user) {
      const date = user.regDate.toString();
      const formattedDate = date.split("T");
      return formattedDate[0];
    }
  };

  const getDaysSinceReg = (today: Date = new Date()) => {
    if (user) {
      const reg = user.regDate.toString();
      const regDate = new Date(reg);
      const timeDiff: number = today.getTime() - regDate.getTime();
      const daysSinceReg: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysSinceReg;
    }
  };

  const calcAge = (inputDate: Date, today: Date = new Date()) => {
    let date: Date;
    let ageToCalc: number;
    if (user) {
      const dateToCalc: Date = new Date(inputDate);
      const birthDate: Date = new Date(user.birth);

      const inputDateStr = dateToCalc.toISOString().split("T");
      const birthDateStr = birthDate.toISOString().split("T");

      if (inputDateStr[0] !== birthDateStr[0]) {
        ageToCalc = dateToCalc.getFullYear() - birthDate.getFullYear();
        date = dateToCalc;
      } else {
        ageToCalc = today.getFullYear() - dateToCalc.getFullYear();
        date = new Date();
      }

      const isBirthdayPassed: boolean =
        date.getMonth() > dateToCalc.getMonth() ||
        (date.getMonth() === dateToCalc.getMonth() &&
          date.getDate() >= dateToCalc.getDate());
      return isBirthdayPassed ? ageToCalc : ageToCalc - 1;
    }
  };

  const calcDeath = () => {
    if (user) {
      const age = calcAge(user.birth);
      if (age) return 100 - age;
    }
  };

  const getBirthValue = () => {
    if (user) {
      const birth = new Date(user.birth);
      const birthVal = birth.toISOString().split("T");
      return birthVal[0];
    }
  };

  const setUserVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(name, value);
  };

  const updateUserInfo = async () => {
    await updateUser();
    handleMessageDisplay();
  };

  const handleMessageDisplay = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    user && (
      <div className="h-[calc(100vh-4rem)] w-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 flex flex-col items-center">
        <div className="h-3/5 w-4/5 mt-16 flex flex-row space-x-6 max-laptop:h-full max-laptop:w-full max-laptop:flex-col max-laptop:space-x-0 max-tablet:mt-0 transition-all duration-300">
          <span className="h-full w-2/3 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg max-laptop:w-full max-laptop:mb-4 max-tablet:rounded-none">
            <div className="w-full h-24 bg-neutral-300 dark:bg-neutral-700 rounded-t-xl shadow-md flex justify-center items-center max-tablet:rounded-none max-tablet:justify-end">
              <header className="text-3xl max-tablet:text-2xl max-tablet:me-10">
                Profile information
              </header>
            </div>
            <div className="px-5">
              <div className="-mt-20 w-28 h-28 bg-white rounded-full shadow-sm">
                <button className="w-full h-full rounded-full"></button>
              </div>
            </div>
            <div className="h-[calc(100%-8rem)] w-full rounded-b-xl">
              <div className="h-full w-full px-9 flex flex-col justify-between">
                <div className="h-fit w-1/2 py-8 flex flex-col text-neutral-900 dark:text-neutral-200 max-tablet:w-full transition-all duration-300">
                  <div className="w-full space-y-1 mb-2">
                    <p className="ms-1">Name:</p>
                    <input
                      className="w-full h-9 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-950 hover:border-neutral-800 dark:hover:border-neutral-400 transition-colors duration-150 px-2 rounded-md"
                      type="text"
                      name="name"
                      required
                      value={user.name}
                      onChange={setUserVal}
                    />
                  </div>
                  <div className="w-full space-y-1 mb-2">
                    <p className="ms-1">Email:</p>
                    <input
                      className="w-full h-9 bg-neutral-200 border border-neutral-400 hover:border-neutral-800 transition-colors duration-150 px-2 rounded-md
                      disabled:hover:border-neutral-200 dark:bg-neutral-800 dark:border-neutral-950 dark:hover:border-neutral-400 dark:disabled:text-neutral-500
                      dark:disabled:hover:border-neutral-950"
                      type="text"
                      name="email"
                      required
                      value={user.email}
                      onChange={setUserVal}
                      disabled
                    />
                  </div>
                  <div className="w-full space-y-1 mb-2">
                    <p className="ms-1">Birth date:</p>
                    <input
                      className="w-full h-9 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-950 hover:border-neutral-800 dark:hover:border-neutral-400 transition-colors duration-150 px-2 rounded-md"
                      type="date"
                      name="birth"
                      value={getBirthValue()}
                      onChange={setUserVal}
                    />
                  </div>
                </div>

                <div className="w-full h-12 mb-2 flex justify-end items-center">
                  <div className="space-x-3">
                    <button
                      disabled={!isEdited}
                      onClick={() => updateUserInfo()}
                      className="w-20 py-1 text-lg hover:bg-yellow-400 hover:text-neutral-900 transition-all duration-200 border border-neutral-400 dark:border-neutral-200 rounded-md
                    disabled:text-neutral-500 disabled:border-neutral-500 disabled:hover:bg-transparent disabled:hover:text-neutral-500"
                    >
                      Save
                    </button>
                    <button
                      disabled={!isEdited}
                      onClick={() => setUser({ ...ogUser })}
                      className="w-20 py-1 text-lg hover:bg-red-700 hover:text-neutral-200 dark:hover:text-neutral-900 transition-colors duration-200 border
                     border-neutral-400 dark:border-neutral-200 rounded-md disabled:text-neutral-500 disabled:border-neutral-500 disabled:hover:bg-transparent disabled:hover:text-neutral-500"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span className="h-full w-1/3 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg max-laptop:w-full max-tablet:rounded-none">
            <div className="w-full h-24 bg-neutral-300 dark:bg-neutral-700 rounded-t-xl shadow-md flex items-center max-tablet:rounded-none max-tablet:justify-center">
              <header className="text-3xl ps-6 max-tablet:text-2xl max-tablet:ps-0">
                Stats
              </header>
            </div>
            <div className="h-[calc(100%-6rem)] w-full rounded-b-xl">
              <div className="h-full w-full px-9 py-5 flex flex-col space-y-3">
                <p>
                  <b>Registered since:</b> {getFormattedDate()}
                </p>
                <p>
                  <b>Days since registration:</b> {getDaysSinceReg()}
                </p>
                <p>
                  <b>Age when registered:</b> {calcAge(user.regDate as Date)}
                </p>
                <p>
                  <b>Age now:</b> {calcAge(user.birth as Date)}
                </p>
                <p>
                  <b>Years left to complete your lists:</b> {calcDeath()}
                </p>
                <p>
                  <b>Bucket lists created:</b> {user.blCreated}
                </p>
                <p>
                  <b>Items completed:</b> {user.itemsCompleted}
                </p>
                <p>
                  <b>Bucket lists completed:</b> {user.blCompleted}
                </p>
              </div>
            </div>
          </span>
        </div>
        <div
          className={`absolute bottom-4 left-4 transition-all duration-300 transform ${
            showMessage
              ? "opacity-100 -translate-x-0"
              : "opacity-0 -translate-x-60"
          }`}
        >
          <div className="w-44 h-20 bg-lime-400 rounded-xl flex flex-col text-neutral-800">
            <div className="w-full h-4 flex justify-end">
              <button className="me-3" onClick={() => setShowMessage(false)}>
                x
              </button>
            </div>
            <div className="w-full h-4/6 flex items-center justify-center">
              <strong>Profile updated.</strong>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
