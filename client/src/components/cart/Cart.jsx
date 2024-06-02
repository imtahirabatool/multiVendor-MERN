import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiMinus } from "react-icons/hi";
import styles from "../../styles/style";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
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

  // Calculate total price for the cart
  const totalPrice = cartData.reduce(
    (acc, item) => acc + item.price * value,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-10 overflow-y-auto">
      <div className="fixed top-0 right-0 h-full w-[25%] bg-white flex flex-col justify-start shadow-sm">
        <div className="flex justify-end p-5">
          <AiOutlineClose
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>
        {/* Cart items */}
        <div className={`${styles.normalFlex} p-4`}>
          <IoBagHandleOutline size={25} />
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
        {/* Checkout button */}
        <div className="mt-auto px-5 mb-3">
          <Link to="/checkout">
            <div className="h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-[5px]">
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now! (USD {totalPrice})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1); // Local state for quantity of each item
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div className="">
          <div
            className={`bg-[#e44243] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={16} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1"
          alt="product"
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            USD {totalPrice}
          </h4>
        </div>
        <AiOutlineClose className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
