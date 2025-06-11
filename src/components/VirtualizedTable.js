import React, { useRef, useState } from "react";
import "../styles/VirtualizedTable.css";

const VirtualizedTable = ({ data, columns, rowHeight, visibleCount }) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = data.length * rowHeight;
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(startIndex + visibleCount, data.length);
  const visibleData = data.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  return (
    <div
      className="vt-container"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: rowHeight * visibleCount }}
    >
      <div className="vt-inner" style={{ height: totalHeight }}>
        <div
          className="vt-content"
          style={{ transform: `translateY(${startIndex * rowHeight}px)` }}
        >
          <div className="vt-header">
            {columns.map((col) => (
              <div key={col.key} className="vt-cell vt-header-cell">
                {col.label}
              </div>
            ))}
          </div>

          {visibleData.map((row, i) => (
            <div
              className="vt-row"
              key={startIndex + i}
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
  );
};

export default VirtualizedTable;
