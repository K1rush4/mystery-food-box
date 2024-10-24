import { useState, useEffect, useRef } from "react";
import { createProduct } from "../../http/productAPI.ts";

interface IAddProductModal {
  addProductVisible: boolean;
  setAddProductVisible: (arg0: boolean) => void;
  categoryId: string | null; // Новый пропс для ID категории
  onProductAdded: () => void; // Новый пропс для обновления списка товаров
}

export default function AddProductModal({ addProductVisible, setAddProductVisible, categoryId, onProductAdded }: IAddProductModal) {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [img, setImg] = useState<File | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-white rounded-2xl shadow-lg transition-opacity duration-300 ease-in-out 
        ${addProductVisible ? "opacity-100 z-50" : "opacity-0 pointer-events-none"}`;
    }
  }, [addProductVisible]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImg(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!img) {
      alert('Пожалуйста, загрузите изображение');
      return;
    }

    if (!categoryId) {
      alert('Ошибка: категория не выбрана');
      return;
    }

    try {
      await createProduct(name, price, categoryId, img); // Используйте categoryId напрямую
      console.log('Продукт создан:', { name, price, categoryId, img });
      onProductAdded(); // Вызов коллбека для обновления списка товаров
      setAddProductVisible(false);
    } catch (error) {
      console.error('Ошибка при создании продукта', error);
    }
  };

  return (
    <>
      {/* Модальное окно */}
      <div ref={modalRef} style={{ display: addProductVisible ? "block" : "none" }}>
        <div className="flex justify-end">
          <img
            src="../../../public/images/close.svg"
            onClick={() => setAddProductVisible(false)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-center p-5">
          <h2 className="text-xl font-bold mb-4">Добавить продукт</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Название:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">Цена:</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
                required
              />
            </div>
            {/* Убрали поле ввода для categoryId */}
            <div className="mb-4">
              <label htmlFor="img" className="block text-gray-700">Изображение:</label>
              <input
                type="file"
                id="img"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md w-full p-2"
                required
              />
            </div>
            <button type="submit" className="bg-yellow-400 text-white rounded-md py-2 px-4 w-full">Добавить товар</button>
          </form>
        </div>
      </div>

      {/* Оверлей */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out 
        ${addProductVisible ? "opacity-100 z-40" : "opacity-0 pointer-events-none"}`}
        onClick={() => setAddProductVisible(false)}
      />
    </>
  );
}
