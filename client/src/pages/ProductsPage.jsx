import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = productData.sort((a, b) => a.totalSell - b.totalSell);
      setData(d);
    } else {
      const d = productData.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0,0);
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={styles.section}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
        {data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No item found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
