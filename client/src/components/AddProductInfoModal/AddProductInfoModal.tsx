import {useState, useEffect, useRef} from "react";
import {createProductInfo, deleteProductInfo, fetchProductInfo} from "../../http/productAPI.ts";

interface IAddProductModal {
  addProductInfoVisible: boolean;
  setAddProductInfoVisible: (arg0: boolean) => void;
  productId: string | null;
  nameProduct: string | null
}

interface IProductInfo {
  id:number,
  consist: string,
  description:string,
  productId:number,
  createdAt: string,
  updatedAt:string,
}

export default function AddProductInfoModal({
                                              addProductInfoVisible,
                                              setAddProductInfoVisible,
                                              productId,
                                              nameProduct
                                            }: IAddProductModal) {
  const [consist, setConsist] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProductInfo = async () => {
      try {
        const productInfo:IProductInfo = productId && await fetchProductInfo(Number(productId));
        setConsist(productInfo.consist)
        setDescription(productInfo.description)
      } catch (error) {
        setConsist('')
        setDescription('')
      }
    };
    loadProductInfo();
    const modal = modalRef.current;
    if (modal) {
      modal.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-white rounded-2xl shadow-lg transition-opacity duration-300 ease-in-out 
        ${addProductInfoVisible ? "opacity-100 z-50" : "opacity-0 pointer-events-none"}`;
    }
  }, [addProductInfoVisible]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      productId && await deleteProductInfo(productId);
      console.log('Инфо продукта productId =', productId, 'удалено');
    } catch (error) {
      console.error('Ошибка при удалении продукта', error);
    }

    try {
      productId && await createProductInfo(consist, description, productId);
      console.log('Инфо продукта создано:', {consist, description, productId});
      setAddProductInfoVisible(false);
    } catch (error) {
      console.error('Ошибка при создании инфо продукта', error);
    }
  };

  return (
    <>
      <div ref={modalRef} style={{display: addProductInfoVisible ? "block" : "none"}}>
        <div className="flex justify-end">
          <img
            src="../../../public/images/close.svg"
            onClick={() => setAddProductInfoVisible(false)}
            className="w-8 h-8 mt-2 mr-2 cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-center p-5">
          <h2 className="text-xl font-bold mb-4">{nameProduct}</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Состоит из:</label>
              <input
                type="text"
                id="consist"
                value={consist}
                onChange={(e) => setConsist(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">Описание:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
                required
              />
            </div>
            <button type="submit" className="bg-yellow-400 text-white rounded-md py-2 px-4 w-full">Изменить описание
            </button>
          </form>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out 
        ${addProductInfoVisible ? "opacity-100 z-40" : "opacity-0 pointer-events-none"}`}
        onClick={() => setAddProductInfoVisible(false)}
      />
    </>
  );
}
