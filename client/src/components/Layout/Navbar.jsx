import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className="flex space-x-6">
      {navItems &&
        navItems.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-white font-medium"
            } px-2 py-1`}
          >
            {item.title}
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
