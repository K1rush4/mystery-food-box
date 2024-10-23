import { useState, useEffect } from 'react';
import {fetchCategory} from "../../http/productAPI.ts";
import {MenuListItem} from "../../intefaces.ts";

function AdminPanel() {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);

  const [categories, setCategories] = useState<MenuListItem[]>([]);

  useEffect(() => {
    if (categoriesVisible && categories.length === 0) {
      const loadCategories = async () => {
        try {
          const categoryData = await fetchCategory();
          setCategories(categoryData);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      loadCategories();
    }
  }, [categoriesVisible]);

  const toggleCategories = () => setCategoriesVisible(!categoriesVisible);
  const toggleProducts = () => setProductsVisible(!productsVisible);
  const toggleUsers = () => setUsersVisible(!usersVisible);

  return (
    <div>
      {/* Категории */}
      <div onClick={toggleCategories} className="cursor-pointer">
        Категории
      </div>
      {categoriesVisible && (
        <div className="pl-5">
          {categories.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {categories.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Товары */}
      <div onClick={toggleProducts} className="cursor-pointer mt-3">
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
      <div onClick={toggleUsers} className="cursor-pointer mt-3">
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
  );
}

export default AdminPanel;
