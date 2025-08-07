import { useDispatch } from "react-redux";
import { toggleLike, deleteProduct } from "../app/store/productsSlice";
import type { AppDispatch } from "../app/store/store";
import type { IProduct } from "../app/store/productsSlice";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";

function Product({ code, product_name, generic_name, image_front_thumb_url, isLiked = false }: IProduct) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike(code));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteProduct(code));
  };

  return (
    <Link to={`/products/${code}`} className={styles.product}>
      <img src={image_front_thumb_url} alt={product_name} className={styles["product-img"]} />
      <h3 className={styles["product-title"]}>{product_name.slice(0, 20)}</h3>
      <p className={styles["product-description"]}>
        {generic_name?.slice(0, 30)}{generic_name && generic_name.length > 100 ? "..." : ""}
      </p>
      <button onClick={handleLike} className={styles["product-button"]}>
        {isLiked ? "❤️" : "🤍"}
      </button>
      <button onClick={handleDelete} className={styles["product-button"]}>
        🗑️
      </button>
    </Link>
  );
}

export default Product;
