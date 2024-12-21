import React from "react";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Цена: {product.price}₽</p>
      <p>Цвет: {product.color}</p>
      <p>Рейтинг: {product.rating}</p>
    </div>
  );
};

export default ProductCard;
