
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function MediaComponents() {
  return (
    <>
      <p className="text-center text-slate-400 my-4 text-sm">
        Or continue with
      </p>

      <div className="flex justify-center gap-4">
        {/* Google */}
        <button className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/20 cursor-pointer">
          <FontAwesomeIcon icon={faGoogle} size="lg" />
        </button>

        {/* Facebook */}
        {/* <button className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/20">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </button> */}

        {/* GitHub */}
        <button className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/20 cursor-pointer">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </button>

        {/* LinkedIn */}
        {/* <button className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/20">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </button> */}
      </div>
    </>
  );
}

export default MediaComponents;
