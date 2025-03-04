import { useState, useEffect } from "react";


const DropDown = ({ head, content}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown state
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest("#dropdown")) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" id="dropdown">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
        {head}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-fit p-5 bg-white border border-gray-300 rounded-md shadow-lg min-w-[200px] right-0 flex flex-col gap-2">
          {content.map((item, idx)=>(<div key={idx} onClick={()=>setIsOpen(false)}>{item.content}</div>))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
