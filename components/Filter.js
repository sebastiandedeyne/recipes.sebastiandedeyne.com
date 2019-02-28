import { useEffect } from "react";

export default function Filter({ value, onChange }) {
  function updateFilterValue(e) {
    if (e.key === "Escape") {
      onChange("");

      return;
    }

    if (e.key === "Backspace") {
      onChange(value.substr(0, value.length - 1));

      return;
    }

    if (e.key.match(/^[a-zA-Z]$/)) {
      onChange(value + e.key);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", updateFilterValue);

    return () => window.removeEventListener("keydown", updateFilterValue);
  }, [updateFilterValue]);

  return value && <p className="filter">{value}</p>;
}
