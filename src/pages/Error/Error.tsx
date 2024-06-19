import "./Error.css"
import {Link} from "react-router-dom";

export default function Error() {
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <div className={"flex items-center flex-col w-full"}>
        <div className={"flex justify-around items-center md:w-4/5 xl:w-3/5"}>
          <div className={"w-2/5 text-center"}>
            <p className={"text-3xl md:text-4xl"}>Упс!</p>
            <p className={"text-xl md:text-2xl mt-4"}>Страница не найдена</p>
            <p className={"text-xl md:text-2xl"}>Возможно она была удалена, не создана или ее похитили
              инопланетяне</p>
          </div>
          <img className={"w-2/5 h-auto max-w-[200px] md:max-w-[300px] "} src={"../../../public/images/notFound.gif"}/>
        </div>
        <Link to="/">
          <button
            className={"text-xl md:text-2xl mt-16 md:mt-24 p-1.5 md:p-2 xl:p-3 bg-neutral-300 border border-black rounded-xl"}>На
            главную
          </button>
        </Link>
      </div>
    </div>
  )
}