import { useEffect, useState } from "react";
import { generateBucketList } from "../../services/GenerateList";
import { Item } from "../../models/Item";
import { RiDeleteBinFill } from "react-icons/ri";
import { CgArrowsExchange } from "react-icons/cg";
import { handleMessageDisplay, PopMessage } from "../../components/PopMessage";

export const InterestList: string[] = [
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

export const LifeGoalsList: string[] = [
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

export const changeInterestList = (
  e: React.ChangeEvent<HTMLInputElement>,
  interestList: string[],
  setInterestList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const clonedList = [...interestList];
  if (clonedList.includes(e.target.value)) {
    const newInterestList = clonedList.filter((res) => res !== e.target.value);
    setInterestList(newInterestList);
  } else {
    setInterestList([...clonedList, e.target.value]);
  }
};

export const changeGoalsList = (
  e: React.ChangeEvent<HTMLInputElement>,
  goalsList: string[],
  setGoalsList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const clonedList = [...goalsList];
  if (clonedList.includes(e.target.value)) {
    const newGoalsList = clonedList.filter((res) => res !== e.target.value);
    setGoalsList(newGoalsList);
  } else {
    setGoalsList([...clonedList, e.target.value]);
  }
};

export const SetupPage = () => {
  const preList = [
    "1. Bake a signature dessert and share the recipe online.",
    "2. Create a blog showcasing your baking creations.",
    "3. Host a baking workshop for friends and family.",
    "4. Participate in a baking competition.",
    "5. Design a custom cake for a special occasion.",
    "6. Get featured in a local magazine for your baking skills.",
    "7. Start a YouTube channel dedicated to baking tutorials.",
    "8. Offer baking classes in your community.",
    "9. Collaborate with a local café to feature your baked goods.",
    "10. Write a baking e-book with your favorite recipes.",
    "11. Attend a culinary school to earn a baking certification.",
    "12. Start a baking business from home and sell your treats online.",
    "13. Create an Instagram page focusing on your baking journey.",
    "14. Join a baking club or community group.",
    "15. Host a baking-themed party or event.",
    "16. Learn to bake with alternative ingredients (gluten-free, vegan, etc.).",
    "17. Develop your own line of baking products.",
    "18. Get featured on a baking or lifestyle TV show.",
    "19. Attend a cooking convention to network and learn.",
    "20. Set a goal to bake a new recipe every week for a year.",
    "21. Master the art of bread making.",
    "22. Build a website to promote your baking business.",
    "23. Participate in charity bake sales or events.",
    "24. Get married and bake your own wedding cake.",
    "25. Learn the science of baking through a formal course.",
    "26. Start a baking podcast discussing recipes and techniques.",
    "27. Create a baking challenge with friends or family.",
    "28. Travel to different countries to learn about their baking traditions.",
    "29. Explore pairing desserts with wines or coffees.",
    "30. Become a certified pastry chef.",
    "31. Master chocolate tempering and create gourmet chocolates.",
    "32. Design a bakery logo and branding for your business.",
    "33. Host a baking competition among friends.",
    "34. Volunteer your baking skills at a local shelter or charity.",
    "35. Develop a unique baking style that reflects your personality.",
    "36. Create seasonal baked goods for holidays and events.",
    "37. Publish your own baking magazine showcasing local bakers.",
    "38. Learn food photography to enhance your baking presentations.",
    "39. Create a line of baking-themed merchandise (aprons, tools, etc.).",
    "40. Mentor someone interested in baking.",
    "41. Write articles for baking forums or websites.",
    "42. Host virtual baking classes for a broader audience.",
    "43. Start a baking delivery service for events and parties.",
    "44. Explore healthy baking alternatives and create a cookbook.",
    "45. Learn to bake croissants and other French pastries.",
    "46. Host an annual baking festival in your community.",
    "47. Start a subscription box service for your baked goods.",
    "48. Create a nonprofit baking initiative to teach youth baking skills.",
    "49. Offer customized baking services for special dietary needs.",
    "50. Build a successful online presence and community around baking.",
  ];

  const [interestList, setInterestList] = useState<string[]>([]);
  const [goalsList, setGoalsList] = useState<string[]>([]);
  const [bucketList, setBucketList] = useState<Item[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [noGoals, setNoGoals] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(!(interestList.length >= 5 && goalsList.length >= 5));
  }, [interestList, goalsList]);

  useEffect(() => {
    setIsDisabled(!(interestList.length >= 5 && noGoals));
  }, [interestList, noGoals]);

  const generateList = async () => {
    setIsGenerating(true);
    setIsDisabled(true);
    const response = await generateBucketList(interestList, goalsList, "50");
    const data = response.content;
    if (data) {
      const listOfItems: string[] = data.split("\n");
      listOfItems.map((res, index) => {
        const item = res.split(".")[1];
        setBucketList((prev) => [
          ...prev,
          {
            id: index,
            content: item,
            done: false,
          },
        ]);
      });
    }
    setIsGenerating(false);
    setIsDisabled(false);
  };

  const saveList = () => {
    console.log("list saved");
  };

  const isDone = (item: Item) => {
    const currentList = bucketList;
    setBucketList(
      currentList.map((res) =>
        res.id === item.id ? { ...res, done: !item.done } : res
      )
    );
    setMessage(
      item.done === false
        ? `${item.content} is done!`
        : `${item.content} unchecked.`
    );
    handleMessageDisplay(setShowMessage);
    setDone(item.done);
  };

  const deleteItem = (item: Item) => {
    const currentList = bucketList;
    setBucketList(currentList.filter((res) => res.id !== item.id));
  };

  return (
    <div
      className={`${
        bucketList.length > 0 ? "h-[calc(100vh-4rem)]" : "h-[calc(100vh-4rem)]"
      } w-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 flex flex-col items-center justify-center`}
    >
      <div
        className={`${
          bucketList.length > 0 ? "h-5/6 flex-col" : "h-5/6"
        } w-5/6 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-lg flex justify-center items-center p-6 max-laptop:w-full max-laptop:rounded-none max-laptop:flex-col transition-all duration-300`}
      >
        {bucketList.length <= 0 ? (
          <>
            {isGenerating ? (
              <div className="w-full h-full flex justify-center items-center flex-col">
                <header className="mb-5 text-2xl">
                  <strong>Generating bucket list...</strong>
                </header>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <span className="interests h-full w-5/12 flex flex-col border-r-2 max-laptop:h-1/2 max-laptop:w-full max-laptop:border-none">
                  <div className="w-full text-3xl flex flex-col max-tablet:text-2xl">
                    <header className="mb-2 max-laptop:flex max-laptop:justify-center transition-all duration-300">
                      <strong className="text-yellow-400 underline underline-offset-8">
                        Choose your preferences.
                      </strong>
                    </header>
                    <div>
                      <strong className="text-xl max-tablet:text-lg transition-all duration-300">
                        Interests:
                      </strong>
                    </div>
                  </div>
                  <div className="w-full h-[calc(100%-1.5rem)] overflow-auto mt-5">
                    <div className="w-full h-[calc(135%)] flex flex-col flex-wrap max-laptop:text-lg max-laptop:items-center max-laptop:flex-nowrap tablet:flex-wrap max-laptop:h-[calc(350%)]">
                      {InterestList.map((res, index) => {
                        return (
                          <div
                            key={`interest-${index}`}
                            className="w-5/12 flex justify-between my-1 hover:text-yellow-500 transition-colors duration-300 max-laptop:w-full tablet:w-1/2"
                          >
                            <label
                              htmlFor={`interest-${index.toString()}`}
                              className="w-full cursor-pointer tablet:w-5/6"
                            >
                              {res}
                            </label>
                            <input
                              className="cursor-pointer me-5"
                              type="checkbox"
                              id={`interest-${index.toString()}`}
                              value={res}
                              onChange={(e) =>
                                changeInterestList(
                                  e,
                                  interestList,
                                  setInterestList
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </span>
                <span className="goals h-full w-7/12 pt-14 ms-6 max-laptop:ms-0 max-laptop:pt-6 max-laptop:h-1/2 max-laptop:w-full">
                  <div className="w-full flex flex-col overflow-auto">
                    <div>
                      <strong className="text-xl max-tablet:text-lg transition-all duration-300">
                        Goals:
                      </strong>
                    </div>
                  </div>
                  <div className="w-full h-[calc(100%-2.8rem)] overflow-auto mt-4">
                    <div className="w-full h-[calc(110%)] flex flex-col flex-wrap max-laptop:text-lg max-laptop:items-center max-laptop:flex-nowrap tablet:flex-wrap max-laptop:h-[calc(300%)]">
                      {LifeGoalsList.map((res, index) => {
                        return (
                          <div
                            key={`lifeGoal-${index}`}
                            className="w-5/12 flex justify-between my-1 hover:text-yellow-500 transition-colors duration-300 max-laptop:w-full tablet:w-1/2"
                          >
                            <label
                              htmlFor={`lifeGoal-${index.toString()}`}
                              className="w-full cursor-pointer tablet:w-5/6"
                            >
                              {res}
                            </label>
                            <input
                              className="cursor-pointer me-5"
                              type="checkbox"
                              id={`lifeGoal-${index.toString()}`}
                              value={res}
                              onChange={(e) =>
                                changeGoalsList(e, goalsList, setGoalsList)
                              }
                            />
                          </div>
                        );
                      })}
                      <div
                        className={`w-5/12 flex justify-between hover:text-yellow-500 transition-colors duration-300 max-laptop:w-full tablet:w-1/2`}
                      >
                        <label
                          htmlFor={`lifeGoal-noGoals`}
                          className="w-full cursor-pointer tablet:w-5/6"
                        >
                          <b>I dont have any goals</b>
                        </label>
                        <input
                          className="cursor-pointer disabled:cursor-default me-5"
                          type="checkbox"
                          disabled={goalsList.length ? true : false}
                          id={`lifeGoal-noGoals`}
                          value="I dont have any goals"
                          onChange={() => setNoGoals(!noGoals)}
                        />
                      </div>
                    </div>
                  </div>
                </span>
              </>
            )}
          </>
        ) : (
          <>
            <div className="w-full h-full overflow-hidden">
              <div className="w-full h-fit flex justify-center my-4 max-laptop:my-0 max-laptop:mb-4">
                <header>
                  <strong className="text-xl">
                    Your generated bucket list
                  </strong>
                </header>
              </div>
              <div className="w-full h-full max-tablet:h-[calc(100%-3rem)]">
                <ol className="w-full h-full flex flex-col space-y-2 overflow-y-auto px-2 max-tablet:px-0">
                  {bucketList.map((res) => (
                    <div
                      key={res.id}
                      className="w-full flex rounded-md bg-neutral-300 dark:bg-neutral-800 max-tablet:min-h-32"
                    >
                      <div className="w-2/3 h-full flex items-center ps-6">
                        <li>{res.content}</li>
                      </div>
                      <div className="w-1/3 h-full flex justify-end space-x-6 items-center max-tablet:w-2/4 max-tablet:space-x-2 max-tablet:me-3">
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer max-tablet:me-2 max-tablet:mt-1">
                            <input
                              type="checkbox"
                              checked={res.done}
                              className="sr-only peer"
                              onChange={() => isDone(res)}
                            />
                            <div
                              className="w-9 h-5 bg-neutral-500 hover:bg-neutral-600 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-200 
                            peer-checked:after:translate-x-full peer-checked:after:border-neutral-50 dark:peer-checked:after:border-neutral-800 after:content-[''] 
                            after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-50 dark:after:bg-neutral-800 after:border-neutral-200 dark:after:border-neutral-800 
                            after:border after:rounded-full after:h-4 after:w-4 after:transition-all 
                            peer-checked:bg-yellow-500 hover:peer-checked:bg-yellow-600 dark:hover:peer-checked:bg-yellow-300
                            "
                            ></div>
                          </label>
                        </div>
                        <button onClick={() => deleteItem(res)}>
                          <RiDeleteBinFill className="h-6 w-6 hover:text-red-700 hover:dark:text-red-500 transition-colors duration-200" />
                        </button>
                        <button onClick={() => console.log(bucketList)}>
                          <CgArrowsExchange className="h-10 w-10 hover:text-lime-600 transition-colors duration-200" />
                        </button>
                      </div>
                    </div>
                  ))}
                </ol>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-5">
        <button
          className="w-48 h-16 border border-neutral-900 rounded-lg bg-yellow-500 text-neutral-900 shadow-none 
         hover:text-neutral-800 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300
        disabled:bg-transparent disabled:hover:text-neutral-900 disabled:hover:shadow-none"
          onClick={() => {
            bucketList.length <= 0 ? generateList() : saveList();
          }}
          disabled={isDisabled}
        >
          <strong>{`${
            bucketList.length <= 0 ? "Generate bucket list" : "Save bucket list"
          }`}</strong>
        </button>
      </div>

      <PopMessage
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message={message}
        isDone={done}
      />
    </div>
  );
};
