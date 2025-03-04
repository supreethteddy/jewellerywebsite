import React, { useEffect, useRef, useState } from "react";

const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select items",
  selectAllText = "Select All",
  clearText = "Clear",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null); 
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value) => {
    if (!selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    }
  };

  const handleDeselect = (value) => {
    onChange(selectedValues.filter((item) => item !== value));
  };

  const handleSelectAll = () => {
    onChange(options.map((option) => option.value));
  };

  const handleClear = () => {
    onChange([]);
  };

  const getLabel = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };
  // Handle clicks outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <div className="relative w-full">
      {/* Input and Selected Tags */}
      <div
        className="p-2 bg-gray-100 rounded outline-none border cursor-pointer flex flex-wrap gap-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded"
            >
              <span>{getLabel(value)}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeselect(value);
                }}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-y-scroll" ref={dropdownRef}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border-b border-gray-200 outline-none"
          />

          {/* Options List */}
          <div className="divide-y divide-gray-200">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  selectedValues.includes(option.value) ? "bg-gray-100" : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>

          {/* Select All and Clear Buttons */}
          <div className="flex justify-between p-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-blue-500 hover:text-blue-700"
            >
              {selectAllText}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-red-500 hover:text-red-700"
            >
              {clearText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
