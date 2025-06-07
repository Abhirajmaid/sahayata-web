import React from "react";
import { Icon } from "@iconify/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${
              currentPage === i
                ? "pagination-btn-active"
                : "pagination-btn-default"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`pagination-btn ${
            currentPage === 1
              ? "pagination-btn-active"
              : "pagination-btn-default"
          }`}
        >
          1
        </button>
      );

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage > 3) {
        buttons.push(
          <span key="dots1" className="pagination-dots">
            ...
          </span>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${
              currentPage === i
                ? "pagination-btn-active"
                : "pagination-btn-default"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="dots2" className="pagination-dots">
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`pagination-btn ${
            currentPage === totalPages
              ? "pagination-btn-active"
              : "pagination-btn-default"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center space-x-3 mt-12 mb-20">
      <button
        className="pagination-btn pagination-btn-default"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon icon="mdi:chevron-left" className="w-5 h-5" />
      </button>

      {renderPaginationButtons()}

      <button
        className="pagination-btn pagination-btn-default"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon icon="mdi:chevron-right" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
