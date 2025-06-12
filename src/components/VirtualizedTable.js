import React, { useRef, useState } from "react";
import "../styles/VirtualizedTable.css";
import { sortData } from "../utils/sorting";
import { useMemo } from "react";

const VirtualizedTable = ({ data, columns, rowHeight, visibleCount }) => {
  const containerRef = useRef(null);
  const [indices, setIndices] = useState([0, visibleCount]);
  const [sortState, setSortState] = useState({ key: null, order: "asc" });

  const totalHeight = data.length * rowHeight;

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / rowHeight);
    const newEndIndex = Math.min(newStartIndex + visibleCount, data.length);
    setIndices([newStartIndex, newEndIndex]);
  };
  const handleSort = (key) => {
    setSortState((prev) => {
      if (prev.key !== key) {
        return { key, order: "asc" };
      }
      // Cycle: asc -> desc -> null
      const nextOrder =
        prev.order === "asc" ? "desc" : prev.order === "desc" ? null : "asc";

      return { key, order: nextOrder };
    });
  };

  const sortedData = useMemo(() => {
    return sortData(data, sortState.key, sortState.order);
  }, [data, sortState]);

  const getSortIndicator = (colKey) => {
    if (sortState.key !== colKey) return "";
    return sortState.order === "asc"
      ? " ▲"
      : sortState.order === "desc"
      ? " ▼"
      : "";
  };

  const visibleData = sortedData.slice(indices[0], indices[1]);

  return (
    <div className="vt-wrapper">
      {/* Header container with scrollbar space */}
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
