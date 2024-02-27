import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";

export default function NotLoggedIn({ setUserInformation }) {
  return (
    <Routes>
      <Route
        path="*"
        element={<Login setUserInformation={setUserInformation} />}
      />
    </Routes>
  );
}
