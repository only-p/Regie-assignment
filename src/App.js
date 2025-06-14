import { useMemo } from "react";
import VirtualizedTable from "./components/VirtualizedTable";
import "./styles.css";
import { generateData,columns } from "./utils/data";

export default function App() {
  const data = useMemo(() => generateData(), []);
  const title = "VirtualizedTable Table";
  console.log(data[0]);
  return (
    <div className="App">
      <div>Regie Assignment</div>
      <VirtualizedTable
        data={data}
        title={title}
        columns={columns}
        rowHeight={40}
        visibleCount={10}
      />
    </div>
  );
}
