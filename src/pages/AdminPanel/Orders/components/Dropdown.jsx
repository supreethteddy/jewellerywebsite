import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ label, onChange, options, selected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="w-full h-full z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded px-3 py-2 h-full bg-white border flex items-center justify-between hover:bg-gray-50"
        >
          <span className="text-gray-700">{selected}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && (
        <div className="absolute rounded z-50 w-full translate-y-1 bg-white border shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-3 rounded py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
