import React, { useRef, useState, useMemo } from "react";
import "../styles/VirtualizedTable.css";
import { sortData } from "../utils/sorting";
import { getColumnUniqueValues, applyFilters } from "../utils/filters";

const VirtualizedTable = ({ data, columns, rowHeight, visibleCount }) => {
  const containerRef = useRef(null);
  const [indices, setIndices] = useState([0, visibleCount]);
  const [sortState, setSortState] = useState({ key: null, order: "asc" });
  const [filters, setFilters] = useState({});

  const totalHeight = data.length * rowHeight;

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / rowHeight);
    const newEndIndex = Math.min(newStartIndex + visibleCount, data.length);
    setIndices([newStartIndex, newEndIndex]);
  };

  const handleSort = (key) => {
    setSortState((prev) => {
      if (prev.key !== key) return { key, order: "asc" };
      const nextOrder =
        prev.order === "asc" ? "desc" : prev.order === "desc" ? null : "asc";
      return { key, order: nextOrder };
    });
  };

  const handleFilterChange = (colKey, value) => {
    setFilters((prev) => {
      const current = new Set(prev[colKey] || []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [colKey]: Array.from(current) };
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const columnOptions = useMemo(
    () => getColumnUniqueValues(data, columns),
    [data, columns]
  );

  const filteredData = useMemo(
    () => applyFilters(data, filters),
    [data, filters]
  );

  const sortedData = useMemo(
    () => sortData(filteredData, sortState.key, sortState.order),
    [filteredData, sortState]
  );

  const visibleData = sortedData.slice(indices[0], indices[1]);

  const getSortIndicator = (colKey) => {
    if (sortState.key !== colKey) return "";
    return sortState.order === "asc"
      ? " ▲"
      : sortState.order === "desc"
      ? " ▼"
      : "";
  };

  return (
    <div className="vt-wrapper">
      {/* Filter Panel */}
      <div className="vt-filters">
        {columns
          .filter((col) => col.key !== "id")
          .map((col) => (
            <div key={col.key} className="vt-filter-group">
              <div className="vt-filter-label">{col.label}</div>
              {columnOptions[col.key]?.map((val) => (
                <label key={val} className="vt-checkbox">
                  <input
                    type="checkbox"
                    checked={filters[col.key]?.includes(val) || false}
                    onChange={() => handleFilterChange(col.key, val)}
                  />
                  {val}
                </label>
              ))}
            </div>
          ))}
        <button className="vt-clear-btn" onClick={clearAllFilters}>
          Clear All Filters
        </button>
      </div>

      {/* Header */}
      <div className="vt-header-wrapper">
        <div className="vt-header">
          {columns.map((col) => (
            <div
              key={col.key}
              className="vt-cell vt-header-cell"
              onClick={() => handleSort(col.key)}
              style={{ cursor: "pointer" }}
            >
              <span>{col.label}</span>
              <span>{getSortIndicator(col.key)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Body */}
      <div
        className="vt-container"
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: rowHeight * visibleCount, overflowY: "auto" }}
      >
        <div className="vt-inner" style={{ height: totalHeight }}>
          <div
            className="vt-content"
            style={{ transform: `translateY(${indices[0] * rowHeight}px)` }}
          >
            {visibleData.map((row, i) => (
              <div
                className="vt-row"
                key={indices[0] + i}
                style={{ height: rowHeight }}
              >
                {columns.map((col) => (
                  <div key={col.key} className="vt-cell">
                    {row[col.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedTable;
