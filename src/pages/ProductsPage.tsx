import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../app/store/productsSlice";
import type { AppDispatch, RootState } from "../app/store/store";
import Product from "../widgets/Product";
import styles from "./ProductsPage.module.css";

const ITEMS_PER_PAGE = 6;

function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  const [filter, setFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const filteredItems = items
    .filter(item => (filter ? item.isLiked : true))
    .filter(item => item.product_name.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles["filter-buttons"]}>
        <button
          className={`${styles["btn"]} ${filter ? styles["btnActive"] : ""}`}
          onClick={() => setFilter(true)}
        >
          Избранные
        </button>
        <button
          className={`${styles["btn"]} ${!filter ? styles["btnActive"] : ""}`}
          onClick={() => setFilter(false)}
        >
          Все
        </button>
      </div>

      <div className={styles["products-page"]}>
        {paginatedItems.map(item => (
          <Product key={item.code} {...item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Назад
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Вперёд
          </button>
        </div>
      )}
    </>
  );
}

export default ProductsPage;
