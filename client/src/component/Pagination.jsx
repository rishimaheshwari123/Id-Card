import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Left and Right arrows

const Pagination = ({ totalPages, currentPage, setPage }) => {
  // Number of pages to show in each group
  const pagesPerGroup = 5;

  // Calculate the start and end page for the current group
  const currentGroupStart = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const currentGroupEnd = Math.min(currentGroupStart + pagesPerGroup - 1, totalPages);

  // Generate page buttons for the current group
  const renderPaginationButtons = () => {
    let buttons = [];

    // Add "Previous" button
    buttons.push(
      <button
        key="prev"
        onClick={() => setPage(currentGroupStart - 1)}
        disabled={currentGroupStart === 1}
        className={`${
          currentGroupStart === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-400"
        } py-2 px-4 mx-1 rounded-full transition duration-300`}
      >
        <FiChevronLeft size={20} />
      </button>
    );

    // Add page number buttons for the current group
    for (let i = currentGroupStart; i <= currentGroupEnd; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-300"
          } py-2 px-4 mx-1 rounded-full transition duration-300`}
        >
          {i}
        </button>
      );
    }

    // Add "Next" button
    buttons.push(
      <button
        key="next"
        onClick={() => setPage(currentGroupEnd + 1)}
        disabled={currentGroupEnd === totalPages}
        className={`${
          currentGroupEnd === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-400"
        } py-2 px-4 mx-1 rounded-full transition duration-300`}
      >
        <FiChevronRight size={20} />
      </button>
    );

    return buttons;
  };

  return (
    <div className="mt-6 flex justify-center items-center w-full max-w-3xl mx-auto">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
