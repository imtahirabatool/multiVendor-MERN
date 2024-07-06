import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backendUrl } from "../../../server";

const ProductCard = ({ data }) => {
  const id = data._id;
  // console.log("🚀 ~ ProductCard ~ data:", data)
  const [isWishlist, setIsWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  // const d = data.name || "";
  // const product_name = d.replace(/\s+/g, "-");
// console.log(data.images);
  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex object-fit:cover justify-end"></div>
      <Link to={`/product/${id}`}>
        <img
          src={`${backendUrl}${data.images && data?.images[0]}`}
          alt="img"
          className=" w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>

      <Link to={`/product/${id}`}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.price === 0 ? data.price : data.discountPrice}$
            </h5>
            <h4 className={`${styles.price}`}>
              {data.price ? data.price + "$" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data.totalSell} sold
          </span>
        </div>
      </Link>

      {/* Wishlist heart icon */}
      <div className="absolute right-2 top-5 flex flex-col items-center space-y-2">
        {isWishlist ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer"
            onClick={handleToggleWishlist}
            color="red"
            title="Remove from Wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer"
            onClick={handleToggleWishlist}
            color="#333"
            title="Add to Wishlist"
          />
        )}

        <AiOutlineEye
          size={22}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick View"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
          color="#444"
          title="Add to cart"
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
