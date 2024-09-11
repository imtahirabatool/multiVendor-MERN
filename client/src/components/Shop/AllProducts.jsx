import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";

const AllProducts = () => {
  const { products, isLoading, error } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller && seller._id) {
      const products = getAllProductsShop(seller._id);
      dispatch(products);
    }
    // console.log("🚀 ~ useEffect ~ products:", products && products.length)
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      type: "number",

      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "USD " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
