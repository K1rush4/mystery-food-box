interface IButtonToCart {
  itemInCard: number
  setItemInCard: (state: number) => void
  style: string
}

export default function ButtonToCart({itemInCard, setItemInCard, style}: IButtonToCart) {

  let leftStyle = ""
  let centerStyle = ""
  let rightStyle = ""
  let toCartStyle = ""

  switch (style) {
    case "main": {
      leftStyle = "rounded-l-full text-[15px] md-home:text-[20px] xl-home:text-[25px] w-[35px] h-[35px] " +
        "md-home:h-[50px] xl-home:h-[60px] bg-white hover:bg-gray-50"
      centerStyle = "flex items-center justify-center text-[15px] md-home:text-[20px] xl-home:text-[25px] " +
        "w-[20px] md-home:w-[50px] xl-home:w-[80px] h-[35px] md-home:h-[50px] xl-home:h-[60px] bg-white"
      rightStyle = "rounded-r-full text-[15px] md-home:text-[20px] xl-home:text-[25px] w-[35px] h-[35px] " +
        "md-home:h-[50px] xl-home:h-[60px] bg-white hover:bg-gray-50"
      toCartStyle = "cursor-pointer text-[15px] md-home:text-[20px] xl-home:text-[25px] rounded-[20px] w-[90px] " +
        "md-home:w-[120px] xl-home:w-[150px] h-[35px] md-home:h-[50px] xl-home:h-[60px] bg-white hover:bg-gray-50"
      break;
    }
    case "product": {
      leftStyle = "rounded-l-full text-2xl md:text-3xl xl:text-4xl w-10 h-10 md:h-[50px] xl:h-[60px] pl-3 " +
        "bg-moccasin hover:bg-moccasin-hover"
      centerStyle = "flex items-center justify-center text-2xl md:text-3xl xl:text-4xl w-full md:w-[130px] " +
        "xl:w-[175px] h-10 md:h-[50px] xl:h-[60px] bg-moccasin"
      rightStyle = "rounded-r-full text-2xl md:text-3xl xl:text-4xl w-10 h-10 md:h-[50px] xl:h-[60px] pr-2 " +
        "bg-moccasin hover:bg-moccasin-hover"
      toCartStyle = "cursor-pointer text-2xl md:text-3xl xl:text-4xl rounded-xl w-full md:w-[200px] xl:w-[250px] " +
        "h-10 md:h-[50px] xl:h-[60px] bg-moccasin hover:bg-moccasin-hover"
      break;
    }
    default: { //cart
      leftStyle = "rounded-l-full text-[15px] md-home:text-[20px] xl-home:text-[25px] w-[35px] h-[35px] " +
        "md-home:h-[50px] xl-home:h-[60px] bg-moccasin hover:bg-moccasin-hover"
      centerStyle = "flex items-center justify-center text-[15px] md-home:text-[20px] xl-home:text-[25px] " +
        "w-[20px] md-home:w-[50px] xl-home:w-[80px] h-[35px] md-home:h-[50px] xl-home:h-[60px] bg-moccasin"
      rightStyle = "rounded-r-full text-[15px] md-home:text-[20px] xl-home:text-[25px] w-[35px] h-[35px] " +
        "md-home:h-[50px] xl-home:h-[60px] bg-moccasin hover:bg-moccasin-hover"
      toCartStyle = "hidden"
      break;
    }
  }

  if (itemInCard > 0) {
    return (
      <div className={"flex"}>
        <button
          className={leftStyle}
          onClick={() => {
            setItemInCard(itemInCard - 1)
          }}>
          -
        </button>
        {/*ToDo вводить какое нибудь число в кол-во шт одной карточки*/}
        <div className={centerStyle}>
          {itemInCard}
        </div>
        <button
          className={rightStyle}
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
        className={toCartStyle}
        onClick={() => {
          setItemInCard(1)
        }}>
        В корзину
      </button>
    )
  }
}