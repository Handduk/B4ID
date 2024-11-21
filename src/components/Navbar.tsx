import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUserContext();

  const signOut = async () => {
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-screen h-16 bg-yellow-400 sticky top-0 flex items-center shadow-md">
      <div className="ms-10 flex-none">
        <a href="/setup">Before I Die</a>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 max-tablet:hidden">
        <p className="text-2xl max-laptop:text-lg transition-all duration-300">
          Generate a bucket list based on <strong>your</strong> preferences
        </p>
      </div>
      {!user ? (
        ""
      ) : (
        <>
          <div className="ms-auto">
            <a href="/profile">
              <FaUserAlt className="w-7 h-7" />
            </a>
          </div>
          <div className="mx-6">
            <button onClick={() => signOut()}>Log out</button>
          </div>
        </>
      )}
    </div>
  );
};
