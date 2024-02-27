import { Route, Routes } from "react-router-dom";
import Main from "../views/Main";

export default function LoggedIn({ userInformation, setUserInformation }) {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
