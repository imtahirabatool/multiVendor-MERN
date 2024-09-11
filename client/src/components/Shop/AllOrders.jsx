import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllOrders = () => {
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller && seller._id) {
      const orders = getAllOrdersOfShop(seller._id);
      dispatch(orders);
    }
  }, [dispatch, seller]);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/orders/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
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

export default AllOrders;
