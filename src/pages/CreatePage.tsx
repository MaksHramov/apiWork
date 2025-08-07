import { type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/store/productsSlice";
import type { AppDispatch } from "../app/store/store";
import styles from './CreatePage.module.css';

function CreatePage() {
  const dispatch = useDispatch<AppDispatch>();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isValidUrl(image)) {
      setError('Введите корректный URL изображения.');
      return;
    }

    const newProduct = {
      code: Date.now(), // уникальный ID
      product_name: title,
      generic_name: description,
      image_front_thumb_url: image,
      isLiked: false,
    };

    dispatch(addProduct(newProduct));
    setSuccess(true);

    // Очистка формы
    setTitle('');
    setDescription('');
    setImage('');
  }

  return (
    <>
      <form className={styles["form-create"]} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          cols={100}
        />
        <input
          type="text"
          placeholder="url изображения"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Создать</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Карточка успешно создана!</p>}
      </form>
    </>
  );
}

export default CreatePage;
