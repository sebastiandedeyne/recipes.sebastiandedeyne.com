import { useEffect, useRef } from "react";

export default function Filter({ value, onChange }) {
  const filterEl = useRef(null);

  function handleKeyDown(e) {
    filterEl.current.focus();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <input
      ref={filterEl}
      className="filter"
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}
