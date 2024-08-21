import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TABS } from "../utils/Helper";

const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab =
    TABS.find((tab) => location.pathname.includes(tab.id))?.id || TABS[0].id;
  const handleTabClick = (tabId) => {
    navigate(`/tabs/${tabId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center gap-4 mx-auto mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-6 py-3 rounded-md transition-all duration-300 ease-in-out ${
              currentTab === tab.id
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-white text-indigo-500 border border-indigo-500 hover:bg-indigo-50"
            } focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-500 ease-in-out ${
              currentTab === tab.id ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
          <img className="w-full max-w-[400px] h-[300px] object-cover" src={tab.content} alt="tabs" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
