import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function NavBar({ handleLogout }) {
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isOpenLogout && (
        <Modal handleClose={() => setIsOpenLogout(false)}>
          <div className="w-full text-center md:flex md:flex-col md:items-center md:justify-center px-8 py-12">
            <h2 className="text-2xl font-medium">
              Are you sure you want to log out?
            </h2>
            <br />
            <div className="flex flex-col items-center w-full space-y-6 ">
              <button
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 hover:-translate-y-1 duration-200 xl:w-3/4"
                onClick={() => {
                  navigate("/");
                  handleLogout({ icon: "👋" });
                  setIsOpenLogout(false);
                }}>
                Yes
              </button>
              <button
                className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 hover:-translate-y-1 duration-200 xl:w-3/4"
                onClick={() => setIsOpenLogout(false)}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      <nav className="bg-[#4eb7f3] text-white font-medium">
        <ul className="flex justify-between py-6 px-8 xl:px-16">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <span
              className="hover:cursor-pointer hover:text-gray-300 duration-200"
              onClick={() => setIsOpenLogout(true)}
              href="/contact">
              Log out
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
