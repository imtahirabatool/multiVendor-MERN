import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductsDetail = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const [isWishlist, setIsWishlist] = useState(false);

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=uryeufhnseuiywe89rfhenifu");
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const increamentCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] min-h-screen`}>
          <div className="w-full py-5 ">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] flex flex-col items-center">
                <img
                  src={data.imageUrl[select].url}
                  alt=""
                  className="w-[80%] mb-4"
                />
                <div className="flex w-full">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.imageUrl[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.imageUrl[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={increamentCount}
                    >
                      +
                    </button>
                  </div>
                  <div className="">
                    {isWishlist ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={handleToggleWishlist}
                        color="red"
                        title="Remove from Wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={handleToggleWishlist}
                        color="#333"
                        title="Add to Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shopAvatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </div>
                <div className="pr-8">
                  <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                    {data.shop.name}
                  </h3>
                  <h5 className="pb-3 text-[15px]">
                    ({data.shop.ratings}) Ratings
                  </h5>
                </div>
                <div
                  className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-1 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            perspiciatis necessitatibus quod numquam, consequatur esse sit id
            autem perferendis, reprehenderit rerum eum magnam rem laudantium
            eveniet tempore maxime cumque quis. At quae numquam reprehenderit
            alias, quia iusto debitis! Ullam corporis recusandae modi eos
            repellendus temporibus, voluptatum voluptatibus ipsa mollitia earum?
            Porro error doloribus consequatur dolores. Nam obcaecati vero
            nesciunt perferendis. Eaque unde impedit modi?
          </p>
          <br />
          <p className="py-2 text-[18px] leading-8 pb-1 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            perspiciatis necessitatibus quod numquam, consequatur esse sit id
            autem perferendis, reprehenderit rerum eum magnam rem laudantium
            eveniet tempore maxime cumque quis. At quae numquam reprehenderit
            alias, quia iusto debitis! Ullam corporis recusandae modi eos
            repellendus temporibus, voluptatum
          </p>
          <br />
          <p className="py-2 text-[18px] leading-8 pb-1 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            perspiciatis necessitatibus quod numquam, consequatur esse sit id
            autem perferendis, reprehenderit rerum eum magnam rem laudantium
            eveniet tempore maxime Ullam corporis recusandae modi eos
            repellendus temporibus, voluptatum voluptatibus ipsa mollitia earum?
            Porro error doloribus consequatur dolores. Nam obcaecati vero
            nesciunt perferendis. Eaque unde impedit modi?
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet</p>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block 800pc:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shopAvatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name} `}>{data.shop.name}</h3>
                <h5 className="pb-2 text text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
              repudiandae in. Natus, delectus dolorum quod cupiditate excepturi
              non incidunt, nulla impedit sed sint quis quo accusantium
              asperiores debitis. Magnam, eveniet. Magni, quia! quasi eveniet
              deserunt unde obcaecati. Dignissimos, perferendis!
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">14 March, 2023</span>
              </h5>
              <h5 className="font-[600]">
                Total Products: <span className="font-[500]">1,211</span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews: <span className="font-[500]">212</span>
              </h5>
              <Link to="/">
                <div className={`${styles.button} rounded-[4px] !h-[39.5px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetail;
