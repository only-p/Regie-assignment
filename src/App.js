import { useMemo } from "react";
import VirtualizedTable from "./components/VirtualizedTable";
import "./styles.css";
import { generateData } from "./utils/data";

export default function App() {
  const data = useMemo(() => generateData(), []);
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" },
  ];
  console.log(data[0]);
  return (
    <div className="App">
      <h1>VirtualizedTable</h1>
      <VirtualizedTable
        data={data}
        columns={columns}
        rowHeight={40}
        visibleCount={10}
      />
    </div>
  );
}
