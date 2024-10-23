import {useEffect, useState} from "react";
import {fetchCategory} from "../../http/productAPI.ts";

interface MenuListItem {
  id:number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function MenuList() {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategory();
        setMenuList(categories);
        console.log(categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  if (menuList && menuList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    menuList && menuList.map((item:MenuListItem, index) => (
      <a href={"/"} key={index} className={"hover:bg-gray-100 active:bg-gray-200 rounded-[10px]"}>
        <div className={"flex items-center m-[5px] text-[15px] xl:text-[20px] gap-[15px] xl:gap-[20px]"}>
          <img className={"w-[20px] md:w-[30px] xl:w-[40px] h-[20px] md:h-[30px] xl:h-[40px]"} src="/images/menu-box.svg"/>
          <div>{item.name}</div>
        </div>
      </a>
    ))
  )
}