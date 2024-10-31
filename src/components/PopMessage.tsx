interface PopMessageProps {
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  isDone?: boolean;
}

export const PopMessage = ({
  showMessage,
  setShowMessage,
  message,
  isDone,
}: PopMessageProps) => {
  return (
    <div
      className={`absolute bottom-4 left-4 transition-all duration-300 transform ${
        showMessage ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-60"
      }`}
    >
      <div
        className={`${
          isDone ? "bg-red-600 text-neutral-100" : "bg-lime-400"
        } w-fit h-20 px-4  rounded-xl flex flex-col text-neutral-800`}
      >
        <div className="w-full h-4 flex justify-end">
          <button onClick={() => setShowMessage(false)}>x</button>
        </div>
        <div className="w-full h-4/6 flex items-center justify-center">
          <strong>{message}</strong>
        </div>
      </div>
    </div>
  );
};

export const handleMessageDisplay = (
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowMessage(true);
  //Skicka till api och uppdatera användaren

  setTimeout(() => {
    setShowMessage(false);
  }, 4000);
};
