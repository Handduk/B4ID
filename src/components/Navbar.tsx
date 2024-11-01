export const Navbar = () => {
  return (
    <div className="w-screen h-16 bg-yellow-400 sticky top-0 flex flex-row items-center shadow-md">
      <div className="ms-10">
        <a href="/setup">Before I Die</a>
      </div>
      <div className="ms-auto">
        <p className="text-2xl">
          Generate a bucket list based on <strong>your</strong> preferences
        </p>
      </div>
      <div className="ms-auto">
        <a href="/profile">Profile</a>
      </div>
      <div className="mx-6">
        <button>Log out</button>
      </div>
    </div>
  );
};
