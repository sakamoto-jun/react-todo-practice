import { PropsWithChildren, useState } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const [direction, setDirection] = useState<"row" | "column">("column");

  console.log("Layout 렌더링!");
  return (
    <div style={{ display: "flex", flexDirection: direction }}>
      <div style={{ padding: "20px" }}>
        <h1>Todo App</h1>
        <button
          onClick={() =>
            setDirection((prev) => (prev === "column" ? "row" : "column"))
          }
        >
          레이아웃 변경
        </button>
      </div>
      {children}
    </div>
  );
}
