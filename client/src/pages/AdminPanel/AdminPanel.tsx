import React, {useState, useEffect} from 'react';
import {createCategory, deleteCategory, fetchCategory} from "../../http/productAPI.ts";
import {MenuListItem} from "../../intefaces.ts";

function AdminPanel() {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);
  const [inputCategory, setInputCategory] = useState<string>('');
  const [inputProduct, setInputProduct] = useState<string>('');

  const [categories, setCategories] = useState<MenuListItem[]>([]);

  const getCategories = async () => {
    try {
      const fetchedCategories = await fetchCategory(); // Получаем категории
      setCategories(fetchedCategories); // Обновляем состояние
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
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

  const handleProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputProduct(value);
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
              <div className={"cursor-pointer w-[320px] px-5 py-2 rounded-md text-xl bg-amber-100"}
                   onClick={handleAddCategory}>Добавить категорию
              </div>
              <input type="text"
                     className={"border-2 rounded-md w-full"}
                     value={inputCategory}
                     onInput={handleChangeCategory}/>
            </div>
            <div className="pl-5 text-xl">
              {categories.length === 0 ? (
                <div>Loading...</div>
              ) : (
                <ul>
                  {categories.map((category) => (
                    <li key={category.id} className="flex items-center">
                      <span>{category.name}</span>
                      <img
                        src="/images/trash.svg"
                        alt="Delete"
                        className="cursor-pointer ml-4 w-[20px] h-[20px]"
                        onClick={() => handleDeleteCategory(category.id.toString())}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>

        )}

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
