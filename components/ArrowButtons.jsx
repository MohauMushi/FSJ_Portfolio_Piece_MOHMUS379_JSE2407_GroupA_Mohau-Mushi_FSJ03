import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ArrowButtons component for navigation in a carousel or gallery.
 * @param {Object} props - The component props.
 * @param {Function} props.onPrevClick - Function to handle previous button click.
 * @param {Function} props.onNextClick - Function to handle next button click.
 * @param {boolean} props.disabled - Whether the buttons should be disabled.
 * @returns {JSX.Element} Previous and Next arrow buttons.
 */
const ArrowButtons = ({ onPrevClick, onNextClick, disabled }) => {
  return (
    <>
      {/* Previous (left) arrow button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onPrevClick();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:bg-opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 z-9"
        disabled={disabled}
      >
        <ChevronLeft size={24} />
      </button>
      {/* Next (right) arrow button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onNextClick();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:bg-opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 z-9"
        disabled={disabled}
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
};

export default ArrowButtons;
