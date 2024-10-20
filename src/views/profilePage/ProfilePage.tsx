import { useEffect, useState } from "react";
import { User } from "../../models/User";

export const ProfilePage = () => {
  const ogUser: User = {
    id: 1,
    name: "Martin Karlsson",
    birth: new Date(1995, 3, 18),
    mail: "martin.karlsson95@hotmail.com",
    regDate: new Date(2021, 11, 12),
    blCreated: 2,
    blCompleted: 0,
  };
  const [user, setUser] = useState<User>(ogUser);
  const [isEdited, setIsEdited] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    setIsEdited(isChanged());
  }, [user]);

  const today: Date = new Date();

  const getFormattedDate = () => {
    const date = user.regDate.toISOString();
    const formattedDate = date.split("T")[0];
    return formattedDate;
  };

  const getDaysSinceReg = () => {
    const timeDiff: number = today.getTime() - user.birth.getTime();
    const daysSinceReg: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysSinceReg;
  };

  const calcAge = (dateToCalc: Date) => {
    let date: Date;
    let ageToCalc: number;

    if (dateToCalc !== user.birth) {
      ageToCalc = dateToCalc.getFullYear() - user.birth.getFullYear();
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
  };

  const calcDeath = () => {
    const age = calcAge(user.birth);
    return 100 - age;
  };

  const setUserVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isChanged = () => {
    return user.name !== ogUser.name || user.mail !== ogUser.mail;
  };

  const handleMessageDisplay = () => {
    setShowMessage(true);
    //Skicka till api och uppdatera användaren

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 flex flex-col items-center">
      <div className="h-3/5 w-4/5 mt-16 flex flex-row space-x-6">
        <span className="h-full w-2/3 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg">
          <div className="w-full h-24 bg-neutral-300 dark:bg-neutral-700 rounded-t-xl shadow-md flex justify-center items-center">
            <header className="text-3xl">Profile information</header>
          </div>
          <div className="px-5">
            <div className="-mt-20 w-28 h-28 bg-white rounded-full shadow-sm">
              <button className="w-full h-full rounded-full"></button>
            </div>
          </div>
          <div className="h-[calc(100%-8rem)] w-full rounded-b-xl">
            <div className="h-full w-full px-9 flex flex-col justify-between">
              <div className="h-fit w-1/2 py-8 flex flex-col text-neutral-900 dark:text-neutral-200">
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
                    className="w-full h-9 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-950 hover:border-neutral-800 dark:hover:border-neutral-400 transition-colors duration-150 px-2 rounded-md"
                    type="text"
                    name="mail"
                    required
                    value={user.mail}
                    onChange={setUserVal}
                  />
                </div>
              </div>

              <div className="w-full h-12 mb-2 flex justify-end items-center">
                <div className="space-x-3">
                  <button
                    disabled={!isEdited}
                    onClick={() => handleMessageDisplay()}
                    className="w-20 py-1 text-lg hover:bg-yellow-400 hover:text-neutral-900 transition-all duration-200 border border-neutral-400 dark:border-neutral-200 rounded-md
                    disabled:text-neutral-500 disabled:border-neutral-500 disabled:hover:bg-transparent disabled:hover:text-neutral-500"
                  >
                    Save
                  </button>
                  <button
                    disabled={!isEdited}
                    onClick={() => setUser(ogUser)}
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
        <span className="h-full w-1/3 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg">
          <div className="w-full h-24 bg-neutral-300 dark:bg-neutral-700 rounded-t-xl shadow-md flex items-center">
            <header className="text-3xl ps-6">Stats</header>
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
                <b>Age when registered:</b> {calcAge(user.regDate)}
              </p>
              <p>
                <b>Age now:</b> {calcAge(user.birth)}
              </p>
              <p>
                <b>Years left to complete your list:</b> {calcDeath()}
              </p>
              <p>
                <b>Bucket lists created:</b> {user.blCreated}
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
  );
};
