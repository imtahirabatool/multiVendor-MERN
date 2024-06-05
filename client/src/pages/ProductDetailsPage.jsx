import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductsDetail from "../components/Products/ProductsDetail";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestProduct from "../components/Products/SuggestProduct";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, [productName]);
  return (
    <div>
      <Header />
      <ProductsDetail data={data} />
      {data && <SuggestProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
