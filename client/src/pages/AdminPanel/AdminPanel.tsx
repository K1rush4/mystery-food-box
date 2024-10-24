import React, {useState, useEffect} from 'react';
import {
  createCategory,
  deleteCategory,
  deleteProduct,
  fetchCategory,
  fetchProductsInCategory
} from "../../http/productAPI.ts";
import {MenuListItem, Product} from "../../intefaces.ts";
import AddProductModal from "../../components/AddProductModal/AddProductModal.tsx";

function AdminPanel() {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);
  const [inputCategory, setInputCategory] = useState<string>('');
  const [categories, setCategories] = useState<MenuListItem[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); // Новый стейт для ID категории

  const getCategories = async () => {
    try {
      const fetchedCategories = await fetchCategory();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
    }
  };

  const getProductsByCategory = async (categoryId: string) => {
    try {
      const products = await fetchProductsInCategory(categoryId); // Получаем товары для категории
      setProductsByCategory((prev) => ({ ...prev, [categoryId]: products }));
    } catch (error) {
      console.error('Ошибка при получении товаров категории:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const toggleCategories = () => setCategoriesVisible(!categoriesVisible);
  const toggleProducts = () => setProductsVisible(!productsVisible);
  const toggleUsers = () => setUsersVisible(!usersVisible);

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputCategory(value);
  };

  const handleAddCategory = async () => {
    if (inputCategory.trim() === '') {
      alert('Введите название категории');
      return;
    }
    try {
      await createCategory(inputCategory);
      console.log('Категория добавлена:', inputCategory);
      setInputCategory('');
      await getCategories();
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      console.log(id)
      await deleteCategory(id);
      console.log('Категория удалена:', id);
      await getCategories();
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      if (expandedCategory) {
        await getProductsByCategory(expandedCategory);
      }
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };

  const handleToggleCategoryProducts = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      getProductsByCategory(categoryId);
    }
  };

  const toggleAddProductModal = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setAddProductVisible(!addProductVisible);
  };

  const handleProductAdded = () => {
    if (selectedCategoryId) {
      getProductsByCategory(selectedCategoryId); // Обновляем товары для выбранной категории
    }
  };

  return (
    <main className="p-[3%]">
      <div className={"flex flex-col gap-5 bg-white p-7 md:p-9 xl:p-12 rounded-[25px]"}>
        {/* Категории */}
        <div onClick={toggleCategories} className="flex justify-center bg-yellow-200 text-4xl
         p-3 rounded-3xl cursor-pointer">
          Категории
        </div>
        {categoriesVisible && (
          <>
            <div className={"flex justify-between gap-5"}>
              <div className={"cursor-pointer w-[320px] px-5 py-2 rounded-md text-xl bg-amber-100"} onClick={handleAddCategory}>
                Добавить категорию
              </div>
              <input type="text" className={"border-2 rounded-md w-full"} value={inputCategory} onInput={handleChangeCategory} />
            </div>
            <div className="pl-5 text-xl">
              {categories.length === 0 ? (
                <div>Loading...</div>
              ) : (
                <ul>
                  {categories.map((category) => (
                    <li key={category.id} className="flex flex-col mb-4">
                      <div className="flex items-center justify-between">
                        <span className="cursor-pointer" onClick={() => handleToggleCategoryProducts(category.id.toString())}>
                          {category.name}
                        </span>
                        <img
                          src="/images/trash.svg"
                          alt="Delete"
                          className="cursor-pointer ml-4 w-[20px] h-[20px]"
                          onClick={() => handleDeleteCategory(category.id.toString())}
                        />
                      </div>
                      {expandedCategory === category.id.toString() && (
                        <>
                          <div
                            onClick={() => toggleAddProductModal(category.id.toString())}
                            className="w-[230px] mt-2 flex justify-center bg-yellow-100 text-xl py-2 rounded-xl cursor-pointer">
                            Добавить продукт
                          </div>
                          <ul className="pl-5 mt-2">
                            {productsByCategory[category.id]?.length ? (
                              productsByCategory[category.id].map((product) => (
                                <li key={product.id} className="flex items-center">
                                  <span>{product.name}</span>
                                  <img
                                    src="/images/trash.svg"
                                    alt="Delete"
                                    className="cursor-pointer ml-4 w-[20px] h-[20px]"
                                    onClick={() => handleDeleteProduct(product.id.toString())}
                                  />
                                </li>
                              ))
                            ) : (
                              <li>Нет товаров</li>
                            )}
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        <AddProductModal
          addProductVisible={addProductVisible}
          setAddProductVisible={setAddProductVisible}
          categoryId={selectedCategoryId} // Передаем выбранный ID категории
          onProductAdded={handleProductAdded} // Передаем коллбек для обновления списка товаров
        />

        {/* Товары */}
        <div onClick={toggleProducts} className="flex justify-center bg-yellow-200 text-4xl
         p-3 rounded-3xl cursor-pointer">
          Товары
        </div>
        {productsVisible && (
          <div className="pl-5">
            <ul>
              <li>Товар 1</li>
              <li>Товар 2</li>
              <li>Товар 3</li>
            </ul>
          </div>
        )}

        {/* Пользователи */}
        <div onClick={toggleUsers} className="flex justify-center bg-yellow-200 text-4xl
         p-3 rounded-3xl cursor-pointer">
          Пользователи
        </div>
        {usersVisible && (
          <div className="pl-5">
            <ul>
              <li>Пользователь 1</li>
              <li>Пользователь 2</li>
              <li>Пользователь 3</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPanel;
