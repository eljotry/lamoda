import React from "react";
import styles from "../styles/SortOptions.module.css";

const SortOptions = ({
  sortOption,
  setSortOption,
  activeSortOption,
  setActiveSortOption,
}) => {
  const handleSortChange = (option) => {
    if (activeSortOption === option) {
      setActiveSortOption(null);
    } else {
      setSortOption(option);
      setActiveSortOption(option);
    }
  };

  return (
    <div className={styles.sortOptions}>
      <button
        onClick={() => handleSortChange("priceAsc")}
        className={`${sortOption === "priceAsc" ? styles.active : ""} ${
          activeSortOption === "priceAsc" ? styles.active : ""
        }`}
      >
        Сначала дешевые
      </button>
      <button
        onClick={() => handleSortChange("priceDesc")}
        className={`${sortOption === "priceDesc" ? styles.active : ""} ${
          activeSortOption === "priceDesc" ? styles.active : ""
        }`}
      >
        Сначала дорогие
      </button>
      <button
        onClick={() => handleSortChange("popular")}
        className={`${sortOption === "popular" ? styles.active : ""} ${
          activeSortOption === "popular" ? styles.active : ""
        }`}
      >
        Сначала популярные
      </button>
    </div>
  );
};

export default SortOptions;
