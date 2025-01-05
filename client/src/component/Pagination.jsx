import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Left and Right arrows

const Pagination = ({ totalPages, currentPage, setPage }) => {
  // Calculate the previous and next page numbers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  // Generate page buttons for individual pages
  const renderPaginationButtons = () => {
    let buttons = [];

    // Add "Previous" button
    buttons.push(
      <button
        key="prev"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-400"
        } py-2 px-4 mx-1 rounded-full transition duration-300`}
      >
        <FiChevronLeft size={20} />
      </button>
    );

    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
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
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages
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
