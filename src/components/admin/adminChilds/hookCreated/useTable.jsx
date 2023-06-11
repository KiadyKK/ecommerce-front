import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import "./useTable.css";

export const TablePage = ({ range, setPage, page, slice, fastButton }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  const changePage = (status) => {
    switch (status) {
      case "fast-prev":
        setPage(1);
        break;
      case "prev":
        setPage((p) => p - 1);
        break;
      case "next":
        setPage((p) => p + 1);
        break;
      case "fast-next":
        setPage(range.length);
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-flex">
      {fastButton && (
        <button
          className={`${page === 1 ? "disabled" : ""} button-table`}
          onClick={() => changePage("fast-prev")}
        >
          <Icon.ChevronDoubleLeft className="h-100 w-100" />
        </button>
      )}

      <button
        className={`${page === 1 ? "disabled" : ""} button-table mx-1`}
        onClick={() => changePage("prev")}
      >
        <Icon.ChevronLeft className="h-100 w-100" />
      </button>
      <span className="page-table">{page}</span>
      <button
        className={`${
          page === range.length || range.length === 0 ? "disabled" : ""
        } button-table ms-1`}
        onClick={() => changePage("next")}
      >
        <Icon.ChevronRight className="h-100 w-100" />
      </button>
      {fastButton && (
        <button
          className={`${
            page === range.length || range.length === 0 ? "disabled" : ""
          } button-table ms-1`}
          onClick={() => changePage("fast-next")}
        >
          <Icon.ChevronDoubleRight className="h-100 w-100" />
        </button>
      )}
    </div>
  );
};

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
