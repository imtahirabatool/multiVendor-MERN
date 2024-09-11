import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/style";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [delivered, setDelivered] = useState(null);

  const availableBalance = seller?.availableBalance.toFixed(2);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));

    const orderData =
      order && order.filter((item) => item.status === "Delivered");
    setDelivered(orderData);
  }, [dispatch, seller._id, order]);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div className={`${styles.button} text-white !h-[42px] !rounded`}>
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
