import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/User";
import { getUserFromDb, updateUserInDb } from "../services/db";
import { signOutUser } from "../services/auth";

interface userProviderProps {
  children: ReactNode;
}

type UserContext = {
  user: User | null;
  setUser: (user: User | null) => void;
  getUser: (id: string) => void;
  setNewUser: (name: string, value: string | Date | number) => void;
  updateUser: () => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContext | undefined>(undefined);

export const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const getUser = async (id: string) => {
    if (!id) {
      throw new Error("User not defined!");
    }

    const userFromDb = await getUserFromDb(id);
    if (userFromDb) {
      const mappedUser: User = {
        id: userFromDb.id,
        name: userFromDb.name,
        birth: userFromDb.birth,
        email: userFromDb.email,
        regDate: userFromDb.regDate,
        blCreated: userFromDb.blCreated,
        blCompleted: userFromDb.blCompleted,
        itemsCompleted: userFromDb.itemsCompleted,
      };
      localStorage.setItem("user", JSON.stringify(mappedUser));
      setUser(mappedUser);
    }
  };

  const setNewUser = (name: string, value: string | Date | number) => {
    if (user) {
      setUser((prev) => {
        if (prev === null) {
          return null;
        } else {
          return {
            ...prev,
            [name]: value,
          };
        }
      });
    }
  };

  const updateUser = async () => {
    await updateUserInDb(user as User);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const clearUser = async () => {
    await signOutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getUser, setNewUser, updateUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
