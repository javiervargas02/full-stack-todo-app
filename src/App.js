import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NotLoggedIn from "./routes/NotLoggedIn";
import LoggedIn from "./routes/LoggedIn";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {
  initAxiosInterceptors,
  getUser,
  deleteUser,
  API_URL,
  setUser,
} from "./utils/helpers";
import axios from "axios";
import NavBar from "./components/NavBar";

initAxiosInterceptors();

export default function App() {
  const [userInformation, setUserInformation] = useState(null);

  const handleLogout = ({
    message = "You've been logged out",
    icon = "ℹ️",
  }) => {
    setUserInformation(null);
    deleteUser();
    toast(message, {
      icon: icon,
    });
  };

  useEffect(() => {
    const user = getUser();
    if (user && user.access_token && user.user) {
      setUserInformation(user);
    } else {
      setUserInformation(null);
      deleteUser();
      return;
    }
    const loadUser = async () => {
      setUserInformation(user);
      try {
        const { data } = await axios.get(`${API_URL}/auth/whoami`);
        setUserInformation(data);
        setUser(data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          handleLogout({ message: err.response.data.detail });
          return;
        }
        toast.error("An unexpected error has occurred, please try again");
      }
    };
    loadUser();
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Router>
        {userInformation ? (
          <>
            <NavBar handleLogout={handleLogout} />
            <LoggedIn
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          </>
        ) : (
          <NotLoggedIn setUserInformation={setUserInformation} />
        )}
      </Router>
    </>
  );
}
