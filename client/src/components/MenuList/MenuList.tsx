import {menuList} from "../../assets/data.ts";

export default function MenuList() {

  //ToDo fetch menuList

  return (
    menuList.map((item, index) => (
      <a href={"/" + item.url} key={index} className={"hover:bg-gray-100 active:bg-gray-200 rounded-[10px]"}>
        <div className={"flex items-center m-[5px] text-[15px] xl:text-[20px] gap-[15px] xl:gap-[20px]"}>
          <img className={"w-[20px] md:w-[30px] xl:w-[40px] h-[20px] md:h-[30px] xl:h-[40px]"} src="/public/images/menu-box.svg"/>
          <div>{item.text}</div>
        </div>
      </a>
    ))
  )
}