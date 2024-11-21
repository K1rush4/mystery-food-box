import "./Home.css"
import Card from "../../components/Card/Card";
import MenuList from "../../components/MenuList/MenuList.tsx";
import {fetchAllProducts, fetchCategory} from "../../http/productAPI.ts";
import {useEffect, useState} from "react";

interface ICategory {
  id: number;
  name: string;
  createAt: Date;
  updateAt: Date;
}

interface IProduct {
  id: number;
  name: string;
  price: string;
  img: string;
  createAt: Date;
  updateAt: Date;
  categoryId: number;
}

export default function Home() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [products, setProducts] = useState<IProduct[]>();

  const getData = async () => {
    try {
      const fetchedCategories: ICategory[] = await fetchCategory();
      setCategories(fetchedCategories);
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const productArea = () => {
    return (
      <>
        {
          categories?.map((category: ICategory) => (
            <div key={category.id}>
              <div className="bg-moccasin rounded-xl px-[20px] py-[10px] text-xl md:text-2xl xl:text-3xl">
                {category.name}
              </div>
              <div className={"contentWindow"}>
                {products?.map((product) => (
                  product.categoryId === category.id ?
                    <Card id={product.id}
                          name={product.name}
                          price={product.price}
                          img={product.img}
                    />
                    : null
                ))}
              </div>
            </div>
          ))}
      </>
    )
  }

  return (
    <main className={"flex gap-[3%] p-[3%]"}>
      <div className={"hidden md:flex flex-col min-h-[300px] bg-white p-[15px] w-[30%] rounded-[15px] " +
        "xl:p-[20px] xl:w-[25%] xl:rounded-[20px]"}>
        <MenuList/>
      </div>
      <div className={"productBox"}>
        {productArea()}
      </div>
    </main>
  )
}
