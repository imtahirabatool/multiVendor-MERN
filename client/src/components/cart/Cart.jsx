import React from "react";

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
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10"></div>
  );
};

export default Cart;
