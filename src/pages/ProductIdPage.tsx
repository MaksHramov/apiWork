import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toggleLike, deleteProduct } from "../app/store/productsSlice";
import type { RootState } from "../app/store/store";
import { Link } from "react-router-dom";
import styles from './ProductIdPage.module.css'

function ProductIdPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.code === id)
  );

  if (!product) return <p>Продукт не найден</p>;

  const handleLike = () => {
    dispatch(toggleLike(product.code));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(product.code));
    navigate("/"); 
  };

  return (
    <>
      <Link to="/"><button  className={styles["exit-button"]}>Назад</button></Link>
      <div className={styles["product-id-page"]}>
        <section className={styles["product-id-page-left"]}>
          <img src={product.image_front_thumb_url} alt={product.product_name} />
        </section>

        <section className={styles["product-id-page-right"]}>
          <h2>{product.product_name}</h2>
          <p>{product.generic_name || "Описание отсутствует."}</p>
          <button className={styles["product-button"]} onClick={handleLike}>
            {product.isLiked ? "❤️" : "🤍"}
          </button>
          <button className={styles["product-button"]} onClick={handleDelete}>
            🗑️
          </button>
        </section>
      </div>
    </>
  );
}

export default ProductIdPage;
