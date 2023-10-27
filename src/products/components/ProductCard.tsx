import { Card, Image } from "@nextui-org/react";
import { Product } from '../interfaces/product';
import { Link } from "react-router-dom";

interface Props{
  product: Product;
  fullDescription?: boolean;
  prefetchProduct?: (id: number) => void;
}


export const ProductCard = ({ product,fullDescription,prefetchProduct }: Props) => {
  const { id,title,description,image,price,category,rating } = product;

  return (
    <Link
      to={`/product/${id}`}
      onMouseEnter={() => prefetchProduct && prefetchProduct(id)}
    >
      <Card className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          <Image
            src={image}
            alt="tailwind logo"
            width={300}
            height={400}
            className="rounded-xl p-5 sm:p-0 bg-white"
          />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">
              {category}
            </p>
          </div>
          <h3 className="font-black text-gray-800 md:text-2xl text-xl">
            {title}
          </h3>

          <p
            className={`md:text-lg text-gray-500 text-base ${
              fullDescription ? "" : "line-clamp-3"
            }`}
          >
            {description}
          </p>

          <p className="text-xl font-black text-gray-800">
            {price}
            <span className="font-normal text-gray-600 text-base">
              {" "}
              +{rating?.rate}
            </span>
          </p>
        </div>
      </Card>
    </Link>
  );
}
