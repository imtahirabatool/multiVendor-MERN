import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import DropDown from "./DropDown";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { backendUrl } from "../../server";
import styles from "../../styles/style";
import { categoriesData, productData } from "../../static/data";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterProducts = productData?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filterProducts.length > 0 ? filterProducts : null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(user);
  // console.log(`Backend URL: ${backendUrl}`);
  // console.log(`User Avatar: ${user.avatar}`);
  // console.log(`Full Avatar URL: ${backendUrl}${user.avatar}`);

  return (
    <>
      {!loading && (
        <div className={`${styles.section}`}>
          <div className="hidden md:flex md:h-[50px] md:my-[20px] items-center justify-between">
            <div>
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt="logo"
                />
              </Link>
            </div>
            {/* Search box */}
            <div className="w-[50%] relative">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full">
                  {searchData &&
                    searchData.map((i, index) => {
                      const d = i.name;
                      const ProductName = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${ProductName}`}>
                          <div className="w-full flex items-center py-3">
                            {i.imageUrl && i.imageUrl[0]?.url && (
                              <img
                                src={i.imageUrl[0].url}
                                alt={i.name}
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                            )}
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
            <div className={`${styles.button}`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10 w-full" : ""
        } transition hidden md:flex items-center justify-between bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative flex items-center justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart
                  size={30}
                  color="rgba(255, 255, 255, 0.83)"
                  onClick={() => setOpenWishlist(true)}
                />
                <span className="absolute -right-1 -top-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgba(255, 255, 255, 0.83)"
                  onClick={() => setOpenCart(true)}
                />
                <span className="absolute -right-1 -top-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backendUrl}${user.avatar}`}
                      alt="Profile"
                      className="w-[35px] rounded-full h-[35px]"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgba(255, 255, 255, 0.83)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Cart popup */}
        {openCart && <Cart setOpenCart={setOpenCart} />}
        {/* Wishlist popup */}
        {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                1
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/* Header Sidebar */}
      {open && (
        <div className="fixed w-full bg-[#0000005f] z-50 h-full top-0 left-0 overflow-hidden">
          <div className="fixed w-[70%] bg-[#fff] h-full top-0 left-0 z-50 overflow-y-scroll">
            <div className="w-full flex justify-between pr-3">
              <div>
                <div
                  className="relative mt-5 ml-4 cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishlist(true)}
                >
                  <AiOutlineHeart size={30} color="rgba(0, 0, 0, 0.83)" />
                  <span className="absolute -right-1 -top-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                    1
                  </span>
                </div>
              </div>
              <AiOutlineClose
                size={30}
                className="ml-4 mt-5 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto relative h-[40px]">
              <input
                type="search"
                placeholder="Search"
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchData && searchData.length !== 0 && (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full">
                  {searchData.map((i, index) => {
                    const d = i.name;
                    const ProductName = d.replace(/\s+/g, "-");
                    return (
                      <Link key={index} to={`/product/${ProductName}`}>
                        <div className="w-full flex items-center py-3">
                          {i.imageUrl && i.imageUrl[0]?.url && (
                            <img
                              src={i.imageUrl[0].url}
                              alt={i.name}
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                          )}
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Navbar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={`${backendUrl}${user.avatar}`}
                      alt="Profile"
                      className="w-[60px] rounded-full mb-10 h-[60px] border-[3px] border-[#35a77b]"
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7]"
                  >
                    Login/
                  </Link>
                  <Link to="/sign-up" className="text-[#000000b7]">
                    Sign-up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
