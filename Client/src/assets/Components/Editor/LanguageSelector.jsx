
import React from "react";
import { Languageversion } from "../../../LanguageVersions";

const languages = Object.entries(Languageversion);

function LanguageSelector({ selectedLanguage, onSelect }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-900/70 rounded-lg border border-white/10 shadow-sm backdrop-blur-sm w-fit">
      {/* Label */}
      <label
        htmlFor="language-select"
        className="text-slate-300 font-medium text-xs sm:text-sm whitespace-nowrap"
      >
        Language:
      </label>

      {/* Dropdown */}
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onSelect(e.target.value)}
        className="px-2 py-1 rounded-md bg-slate-800 text-slate-50 border border-white/10 
                   text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition-all duration-200 ease-in-out 
                   hover:border-indigo-400"
      >
        {languages.map(([language, { version }]) => (
          <option
            key={language}
            value={language} 
            className="bg-slate-800 text-slate-100"
          >
            {`${language} (v${version})`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
