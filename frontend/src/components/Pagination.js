import React, { useState, useEffect } from "react";

// Assets
import { angleRightIcon, angleLeftIcon } from "../helpers/icons";

const Pagination = ({ data, allData, setData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setData(allData.slice(0, itemsPerPage));
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(allData.length / itemsPerPage));
  }, [data, itemsPerPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
    setData(allData.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };

  return (
    <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="flex items-center">
        <button
          type="button"
          className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
          onClick={() => {
            if (currentPage > 1) {
              handlePagination(currentPage - 1);
            }
          }}
        >
          {angleLeftIcon("", 9, 8)}
        </button>
        {Array.from({ length: totalPages }, (v, k) => k + 1).map((page) => (
          <button
            key={page}
            type="button"
            className={`w-full px-4 py-2 border-t border-b text-base ${
              currentPage === page
                ? "text-white bg-slate-400 hover:bg-gray-500"
                : "text-gray-600 bg-white hover:bg-gray-10"
            }`}
            onClick={() => handlePagination(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="w-full p-4 border-t border-b border-r border-l text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
          onClick={() => {
            if (currentPage < totalPages) {
              handlePagination(currentPage + 1);
            }
          }}
        >
          {angleRightIcon("", 9, 8)}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
