import React from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({ children, handleClose }) {
  return (
    <div className="absolute w-full bg-white/90 min-h-screen z-50 flex items-center px-8">
      <div className="relative border shadow-2xl rounded-xl md:w-1/2 mx-auto bg-white">
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="lg"
          className="absolute text-black cursor-pointer top-3 right-3 hover:opacity-70"
          role="button"
          onClick={() => {
            handleClose();
          }}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
