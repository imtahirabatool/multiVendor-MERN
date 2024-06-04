import React, { useState } from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/style";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "iPhone 14 Pro Max 256GB SSD and 8GB RAM silver color",
      description: "test",
      price: 999,
    },
    {
      name: "iPhone 14 Pro Max 256GB SSD and 8GB RAM silver color",
      description: "test",
      price: 224,
    },
    {
      name: "iPhone 14 Pro Max 256GB SSD and 8GB RAM silver color",
      description: "test",
      price: 449,
    },
  ];

  const [value, setValue] = useState(1);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-10 overflow-y-auto">
      <div className="fixed top-0 right-0 h-full w-[90%] md:w-[25%] bg-white flex flex-col justify-start shadow-sm">
        <div className="flex justify-end p-5">
          <AiOutlineClose
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenWishlist(false)}
          />
        </div>
        {/* Cart items */}
        <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={25} />
          <h5 className="pl-2 text-[20px] font-[500]">
            {cartData.length} Items
          </h5>
        </div>
        {/* Cart Single items */}
        <div className="w-full border-t overflow-y-auto">
          {cartData.map((item, index) => (
            <CartSingle
              key={index}
              data={item}
              value={value}
              setValue={setValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, value, setValue }) => {
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4 flex items-center">
      <AiOutlineClose className="cursor-pointer mr-3" />
      <img
        src="https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1"
        alt="product"
        className="w-[80px] h-[80px] mr-3"
      />
      <div className="flex-1">
        <h1 className="text-sm md:text-base">{data.name}</h1>
        <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
          USD {totalPrice}
        </h4>
      </div>
      <BsCartPlus size={20} className="cursor-pointer" title="add to cart" />
    </div>
  );
};

export default Wishlist;
