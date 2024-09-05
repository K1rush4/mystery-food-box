import "./Home.css"
import Burger from "../../components/Burger/Burger.tsx";
import Card from "../../components/Card/Card";
import MenuList from "../../components/MenuList/MenuList.tsx";

interface IHome {
  burgerState: boolean;
  setBurgerState: (state: boolean) => void;
}

export default function Home({burgerState, setBurgerState}: IHome) {

  return (
    <main className={"homeMain"}>
      <div className={"hidden md:flex flex-col min-h-[300px] bg-white p-[15px] w-[30%] rounded-[15px] " +
        "xl:p-[20px] xl:w-[25%] xl:rounded-[20px]"}>
        <MenuList/>
      </div>
      <div className={"contentWindow"}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </main>
  )
}
