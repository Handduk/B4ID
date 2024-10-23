import { useEffect, useState } from "react";

export const SetupPage = () => {
  const InterestList: string[] = [
    "Archery",
    "Astronomy",
    "Baking",
    "Bird watching",
    "Brewing beer",
    "Calligraphy",
    "Camping",
    "Chess",
    "Collecting coins",
    "Collecting stamps",
    "Cooking",
    "Crocheting",
    "Cryptocurrency",
    "Dancing",
    "DJing",
    "Fishing",
    "Fitness",
    "Gardening",
    "Geocaching",
    "Hiking",
    "History",
    "Horseback riding",
    "Investing in stocks",
    "Knitting",
    "Learning languages",
    "Magic",
    "Martial arts",
    "Meditation",
    "Mountain biking",
    "Movies",
    "Origami",
    "Painting",
    "Painting miniature models",
    "Photography",
    "Playing instruments",
    "Podcasting",
    "Poetry",
    "Pottery",
    "Producing music",
    "Reading",
    "Rock climbing",
    "Roller skating",
    "Scuba diving",
    "Skateboarding",
    "Stargazing",
    "Surfing",
    "Traveling",
    "Video games",
    "Volunteering",
    "Weightlifting",
    "Wine",
    "Woodworking",
    "Writing",
    "Yoga",
  ];

  const LifeGoalsList: string[] = [
    "Achieve financial freedom",
    "retire early",
    "Adopt a child",
    "Become a grandparent",
    "Become an expert in your field",
    "Be featured in a magazine/TV show",
    "Be a supportive and loving partner",
    "Build a large emergency fund",
    "Buy your first home",
    "Buy a vacation home",
    "Climb a mountain",
    "Create a charitable foundation",
    "Develop a family tradition",
    "Earn a degree or certification",
    "Find a life-long sport or fitness routine",
    "Find true love",
    "Get married",
    "Get your dream job",
    "Invest in real estate",
    "Learn to fly an airplane",
    "Learn to play an instrument",
    "Live in a different country",
    "Live as a digital nomad",
    "Master a hobby",
    "Pay off all debt",
    "Raise well-rounded, kind children",
    "Reach a six-figure salary",
    "Reach your ideal state of physical fitness",
    "Run a marathon",
    "Save for your child's education",
    "See the Northern Lights",
    "Speak at a TED Talk or similar event",
    "Start a family",
    "Start and grow your own business",
    "Take a year off to travel the world",
    "Travel to all seven continents",
    "Travel to the Wonders of the World",
    "Visit Antarctica",
    "Volunteer at a local organization",
    "Write a book and get it published",
    "Write and publish a will",
    "Write and publish a book",
    "Save for retirement",
  ];

  const [interestList, setInterestList] = useState<string[]>([]);
  const [goalsList, setGoalsList] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(interestList.length === 0 && goalsList.length === 0);
  }, [interestList, goalsList]);

  const changeInterestList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clonedList = [...interestList];
    if (clonedList.includes(e.target.value)) {
      const newInterestList = clonedList.filter(
        (res) => res !== e.target.value
      );
      setInterestList(newInterestList);
    } else {
      setInterestList([...clonedList, e.target.value]);
    }
  };

  const changeGoalsList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clonedList = [...goalsList];
    if (clonedList.includes(e.target.value)) {
      const newGoalsList = clonedList.filter((res) => res !== e.target.value);
      setGoalsList(newGoalsList);
    } else {
      setGoalsList([...clonedList, e.target.value]);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 flex flex-col items-center justify-center">
      <div className="h-5/6 w-5/6 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg flex flex-row p-6">
        <span className="h-full w-5/12 flex flex-col border-r-2">
          <div className="w-full text-3xl flex flex-col">
            <header className="mb-2">
              <strong className="underline underline-offset-8">
                Choose your preferences.
              </strong>
            </header>
            <div>
              <strong className="text-xl">Interests:</strong>
            </div>
          </div>
          <div className="w-full h-[calc(100%-1.5rem)] overflow-auto mt-5">
            <div className="w-full h-[calc(135%)] flex flex-col flex-wrap space-y-1">
              {InterestList.map((res, index) => {
                return (
                  <div
                    key={`interest-${index}`}
                    className="w-48 flex justify-between"
                  >
                    <label
                      htmlFor={`interest-${index.toString()}`}
                      className="w-full"
                    >
                      {res}
                    </label>
                    <input
                      type="checkbox"
                      id={`interest-${index.toString()}`}
                      value={res}
                      onChange={(e) => changeInterestList(e)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </span>
        <span className="h-full w-7/12 pt-12 ms-6">
          <div className="w-full text-3xl flex flex-col overflow-auto">
            <div>
              <strong className="text-xl">Goals:</strong>
            </div>
          </div>
          <div className="w-full h-[calc(100%-3.5rem)] overflow-auto mt-4">
            <div className="w-full h-[calc(110%)] flex flex-col flex-wrap space-y-1">
              {LifeGoalsList.map((res, index) => {
                return (
                  <div
                    key={`lifeGoal-${index}`}
                    className="w-5/12 flex justify-between"
                  >
                    <label
                      htmlFor={`lifeGoal-${index.toString()}`}
                      className="w-full"
                    >
                      {res}
                    </label>
                    <input
                      type="checkbox"
                      id={`lifeGoal-${index.toString()}`}
                      value={res}
                      onChange={(e) => changeGoalsList(e)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </span>
      </div>
      <div className="mt-5">
        <button
          className="w-48 h-16 border border-neutral-900 rounded-lg bg-yellow-500 text-neutral-900 shadow-none 
         hover:text-neutral-800 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300
        disabled:bg-transparent disabled:hover:text-neutral-900 disabled:hover:shadow-none"
          onClick={() => {
            console.log(interestList, goalsList);
          }}
          disabled={isDisabled}
        >
          <strong>Generate bucket list</strong>
        </button>
      </div>
    </div>
  );
};
