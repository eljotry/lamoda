import React, { useState } from "react";
import ProductList from "./ProductList";
import Filters from "./Filters";
import SortOptions from "./SortOptions";
import styles from "../styles/App.module.css";

const categories = [
  "Спортивная одежда",
  "Офисная одежда",
  "Вечерние платья",
  "Верхняя одежда",
  "Обувь",
  "Аксессуары",
  "Домашняя одежда",
  "Повседневная одежда",
  "Пляжная одежда",
  "Нижнее белье",
];

const images = [
  "/images/skirt.jpg",
  "/images/top.jpg",
  "/images/tshirt.jpg",
  "/images/blaze.jpg",
  "/images/blazer.jpg",
  "/images/blouse.jpg",
  "/images/coat.jpg",
  "/images/dress.jpg",
  "/images/fur.jpg",
  "/images/jacket.jpg",
  "/images/pajamas.jpg",
  "/images/shirt.jpg",
  "/images/short.jpg",
  "/images/shorts.jpg",
  "/images/sweater.jpg",
  "/images/swimsuit.jpg",
  "/images/topic.jpg",
  "/images/topi.jpg",
  "/images/vest.jpg",
  "/images/skrt.jpg",
];

const generateInitialProducts = () => {
  const productData = [
    { name: "Футболка", description: "Приятная к телу, универсальная" },
    { name: "Шуба", description: "Согревает, подходит для холодной зимы" },
    { name: "Джинсовка", description: "Впишется в любой образ" },
    { name: "Купальник", description: "Лучшая находка на летний отдых" },
    { name: "Очки", description: "Этот аксессуар дополнит любой образ" },
    { name: "Джинсы", description: "Удобные, не стесняют движение" },
    { name: "Брюки", description: "Подходят для важных встреч" },
    { name: "Юбка", description: "Прекрасно дополнит романтический образ" },
    { name: "Шорты", description: "Подойдут для спортивного отдыха" },
    { name: "Рубашка", description: "Подчеркнёт Ваш серьёзный настрой" },
    { name: "Пиджак", description: "Подойдёт под любой образ" },
    { name: "Топ", description: "С ним покорите своей красотой всех вокруг" },
    { name: "Куртка", description: "Подойдёт на холодную осень" },
    { name: "Пальто", description: "Дополнит осенний образ" },
    { name: "Жилетка", description: "Согреет в теплую осень" },
    { name: "Туфли", description: "Поразите всех своей грацией" },
    {
      name: "Кроссовки",
      description: "В них Вы будете чувствовать себя комфортно",
    },
    { name: "Спортивный костюм", description: "Надевайте на активный отдых" },
    { name: "Пижама", description: "С ней Ваш сон станет еще приятнее" },
    { name: "Платье", description: "Подходит для ценных встреч" },
  ];

  const colors = ["красный", "зелёный", "синий", "жёлтый", "розовый"];

  return productData.map((data) => ({
    ...data,
    category: categories[Math.floor(Math.random() * categories.length)],
    image: images[Math.floor(Math.random() * images.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    price: Math.floor(Math.random() * 9990) + 10,
    rating: (Math.random() * 5).toFixed(1),
  }));
};

const App = () => {
  const [initialProducts] = useState(generateInitialProducts());
  const [filters, setFilters] = useState({
    search: "",
    colors: [],
    priceRange: [10, 9999],
    ratingRange: [0, 5],
  });
  const [sortOption, setSortOption] = useState("priceAsc");
  const [activeSortOption, setActiveSortOption] = useState(null);

  const filterFunctions = [
    (product) =>
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase()),
    (product) =>
      filters.colors.length === 0 || filters.colors.includes(product.color),
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1],
    (product) =>
      product.rating >= filters.ratingRange[0] &&
      product.rating <= filters.ratingRange[1],
  ];

  const applyFilters = (products) => {
    return products.filter((product) =>
      filterFunctions.every((filter) => filter(product))
    );
  };

  const filteredProducts = applyFilters(initialProducts);
  const sortedProducts = activeSortOption
    ? sortProducts(filteredProducts, activeSortOption)
    : filteredProducts;
  const displayedProducts = sortedProducts.slice(0, 10);

  return (
    <div className={styles.app}>
      <h1>Lamoda</h1>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Поиск"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <SortOptions
          sortOption={sortOption}
          setSortOption={(option) => {
            if (activeSortOption === option) {
              setActiveSortOption(null);
            } else {
              setSortOption(option);
              setActiveSortOption(option);
            }
          }}
          activeSortOption={activeSortOption}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.filters}>
          <Filters
            filters={filters}
            setFilters={setFilters}
            products={initialProducts}
          />
        </div>
        <ProductList products={displayedProducts} />
      </div>
    </div>
  );
};

const sortProducts = (products, option) => {
  switch (option) {
    case "priceAsc":
      return [...products].sort((a, b) => a.price - b.price);
    case "priceDesc":
      return [...products].sort((a, b) => b.price - a.price);
    case "popular":
      return [...products].sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
};

export default App;
