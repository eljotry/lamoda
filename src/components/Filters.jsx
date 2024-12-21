import React, { useEffect, useState } from "react";
import styles from "../styles/Filters.module.css";

const Filters = ({ filters, setFilters, products }) => {
  const colors = ["красный", "зелёный", "синий", "жёлтый", "розовый"];
  const [productCount, setProductCount] = useState(0);

  const handleColorChange = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    setFilters({ ...filters, colors: newColors });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = [...filters.priceRange];

    if (value.length > 4 || value < 0) {
      return;
    }

    if (name === "minPrice") {
      newPriceRange[0] = value ? Number(value) : "";
    } else if (name === "maxPrice") {
      newPriceRange[1] = value ? Number(value) : "";
    }

    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    const newRatingRange = [...filters.ratingRange];
    const parsedValue = value ? parseFloat(value) : "";

    if (value < 0) {
      return;
    }

    if (name === "minRating" && parsedValue >= 0 && parsedValue <= 5) {
      newRatingRange[0] = parsedValue;
    } else if (name === "maxRating" && parsedValue >= 0 && parsedValue <= 5) {
      newRatingRange[1] = parsedValue;
      if (newRatingRange[0] > parsedValue) {
        newRatingRange[0] = parsedValue;
      }
    }

    setFilters({ ...filters, ratingRange: newRatingRange });
  };

  const calculateProductCount = () => {
    const { ratingRange } = filters;
    const minRating = ratingRange[0];
    const maxRating = ratingRange[1];

    const count = products.filter((product) => {
      return (
        product.rating >= minRating &&
        product.rating <= maxRating &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (filters.colors.length === 0 || filters.colors.includes(product.color))
      );
    }).length;

    setProductCount(count);
  };

  useEffect(() => {
    calculateProductCount();
  }, [filters, products]);

  return (
    <div className={styles.filters}>
      <h2>Фильтры</h2>
      <div>
        <h3>Выбор цвета</h3>
        {colors.map((color) => (
          <label key={color} className={styles.colorLabel}>
            <input
              type="checkbox"
              checked={filters.colors.includes(color)}
              onChange={() => handleColorChange(color)}
            />
            {color}
          </label>
        ))}
      </div>

      <div className={styles.priceFilter}>
        <h3>Поиск по цене</h3>
        <div className={styles.priceInputs}>
          <input
            type="number"
            name="minPrice"
            value={filters.priceRange[0]}
            onChange={handlePriceChange}
            placeholder="0"
            min="0"
          />
          <span className={styles.priceSeparator}> - </span>
          <input
            type="number"
            name="maxPrice"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <div className={styles.ratingFilter}>
        <h3>Поиск по рейтингу</h3>
        <div className={styles.ratingInputs}>
          <input
            type="number"
            name="minRating"
            value={filters.ratingRange[0]}
            onChange={handleRatingChange}
            placeholder="0"
            min="0"
            max="5"
            step="0.1"
          />
          <span className={styles.priceSeparator}> - </span>
          <input
            type="number"
            name="maxRating"
            value={filters.ratingRange[1]}
            onChange={handleRatingChange}
            placeholder="0"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
      </div>

      <p className={styles.productCount}>Найдено товаров: {productCount}</p>
    </div>
  );
};

export default Filters;
