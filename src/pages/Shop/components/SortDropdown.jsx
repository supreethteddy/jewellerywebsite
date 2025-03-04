import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort");

  const options = [
    "Sort",
    "What's new",
    "Price - high to low",
    "Price - low to high",
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative w-full h-full z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 h-full bg-white border flex items-center justify-between hover:bg-gray-50"
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
        <div className="absolute z-10 w-full mt-1 bg-white border shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SortDropdown;
