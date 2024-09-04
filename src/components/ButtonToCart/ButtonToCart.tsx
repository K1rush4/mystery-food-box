interface IButtonToCart {
  itemInCard: number
  setItemInCard: (state: number) => void
  inMainPage: boolean
}

export default function ButtonToCart({itemInCard, setItemInCard, inMainPage}: IButtonToCart) {
  if (itemInCard > 0) {
    return (
      <div className={"flex justify-center md:justify-start items-center"}>
        <button
          className={`rounded-l-full ${inMainPage ?
            "text-[15px] md-home:text-[20px] xl-home:text-[25px] " +
            "w-[35px] h-[35px] md-home:h-[50px] xl-home:h-[60px] " +
            "bg-white hover:bg-gray-50 ":
            
            "text-2xl md:text-3xl xl:text-4xl w-10 h-10 md:h-[50px] xl:h-[60px] pl-3 " +
            "bg-moccasin hover:bg-moccasin-hover"
          }`}
          onClick={() => {
            setItemInCard(itemInCard - 1)
          }}>
          -
        </button>
        {/*ToDo вводить какое нибудь число в кол-во шт одной карточки*/}
        <div className={`flex items-center justify-center ${inMainPage ?
          "text-[15px] md-home:text-[20px] xl-home:text-[25px] " +
          "w-[20px] md-home:w-[50px] xl-home:w-[80px] " +
          "h-[35px] md-home:h-[50px] xl-home:h-[60px]":
          
          "text-2xl md:text-3xl xl:text-4xl w-full md:w-[130px] xl:w-[175px] h-10 md:h-[50px] xl:h-[60px]"
        } `}
             style={{backgroundColor: inMainPage ? "white" : "moccasin"}}>
          {itemInCard}
        </div>
        <button
          className={`rounded-r-full ${inMainPage ?
            "text-[15px] md-home:text-[20px] xl-home:text-[25px] " +
            "w-[35px] h-[35px] md-home:h-[50px] xl-home:h-[60px] " +
            "bg-white hover:bg-gray-50":
            
            "text-2xl md:text-3xl xl:text-4xl w-10 h-10 md:h-[50px] xl:h-[60px] pr-2 " +
            "bg-moccasin hover:bg-moccasin-hover"
          }`}
          onClick={() => {
            setItemInCard(itemInCard + 1)
          }}>
          +
        </button>
      </div>
    )
  } else {
    return (
      <button
        className={` cursor-pointer ${inMainPage ?
          "text-[15px] md-home:text-[20px] xl-home:text-[25px] rounded-[20px] " +
          "w-[90px] md-home:w-[120px] xl-home:w-[150px] " +
          "h-[35px] md-home:h-[50px] xl-home:h-[60px] " +
          "bg-white hover:bg-gray-50" :

          "text-2xl md:text-3xl xl:text-4xl rounded-xl " +
          "w-full md:w-[200px] xl:w-[250px] " +
          "h-10 md:h-[50px] xl:h-[60px] " +
          "bg-moccasin hover:bg-moccasin-hover"
        }`}
        // style={{backgroundColor: inMainPage ? "white" : "moccasin"}}
        onClick={() => {
          setItemInCard(1)
        }}>
        В корзину
      </button>
    )

  }
}