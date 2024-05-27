import React from "react";
import styles from "../../styles/style";
import CountDown from "./CountDown";

const EventCard = () => {
  return (
    <div className="w-full block bg-white rounded-lg lg:flex p-2">
      <div className="w-full lg:w-1/2 m-auto">
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_EMEA_LANG_FR?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1654021658445"
          alt="MacBook Pro"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
        <h2 className={`${styles.productTitle}`}>
          MacBook Pro M2 chipset 256GB SSD 8GB RAM space-gray color with Apple 1
          year warranty
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          deserunt ratione molestias tenetur sunt, harum error et quasi. Modi
          quisquam id a tempore ea magni voluptatibus quam, vero cum explicabo.
          Quis, culpa harum corporis odit ut odio nulla unde voluptatem minima
          perspiciatis nihil. Perspiciatis, dolorum. Expedita debitis molestiae
          quos veritatis ipsam possimus voluptate, sequi libero reprehenderit
          sint suscipit, earum molestias? Rerum quo harum a blanditiis quod nam
          modi nobis suscipit dolor ex hic voluptates nulla itaque vero quos
          voluptas maiores repudiandae reiciendis veniam explicabo, eaque nisi?
          Facere sit odit accusantium. Aspernatur facilis nihil laboriosam hic
          molestias! Totam repudiandae similique velit amet aut eum dolor quas,
          labore quia beatae.
        </p>
        <div className="flex py-2 justify-between items-center">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              $1099
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              $1049
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 Sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
