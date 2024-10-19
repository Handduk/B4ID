import { User } from "../../models/User";

export const ProfilePage = () => {
  const user: User = {
    id: 1,
    name: "Martin Karlsson",
    birth: new Date(1995, 3, 18),
    mail: "martin.karlsson95@hotmail.com",
    regDate: new Date(2021, 11, 12),
    blCreated: 2,
    blCompleted: 0,
  };
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
                    defaultValue={user.name}
                  />
                </div>
                <div className="w-full space-y-1 mb-2">
                  <p className="ms-1">Email:</p>
                  <input
                    className="w-full h-9 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-950 hover:border-neutral-800 dark:hover:border-neutral-400 transition-colors duration-150 px-2 rounded-md"
                    type="text"
                    defaultValue={user.mail}
                  />
                </div>
              </div>

              <div className="w-full h-12 mb-2 flex justify-end items-center">
                <div className="space-x-3">
                  <button className="w-20 py-1 text-lg hover:bg-yellow-400 hover:text-neutral-900 transition-colors duration-150 border border-neutral-400 dark:border-neutral-200 rounded-md">
                    Save
                  </button>
                  <button className="w-20 py-1 text-lg hover:bg-red-700 hover:text-neutral-200 dark:hover:text-neutral-900 transition-colors duration-150 border border-neutral-400 dark:border-neutral-200 rounded-md">
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
            <div className="h-full w-full px-9 py-5 flex flex-col space-y-2">
              <p>Registered since: {getFormattedDate()}</p>
              <p>Days since registration: {getDaysSinceReg()}</p>
              <p>Age when registered: {calcAge(user.regDate)}</p>
              <p>Age now: {calcAge(user.birth)}</p>
              <p>Years left to complete your list: {calcDeath()}</p>
              <p>Bucket lists created: {user.blCreated}</p>
              <p>Bucket lists completed: {user.blCompleted}</p>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};
