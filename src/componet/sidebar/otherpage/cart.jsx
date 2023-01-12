import React, { useState, useEffect } from "react";
import "./tradeAndWin.css";
import axios from "axios";
import { Url } from "../../../global";
import { ReactComponent as Warn } from "../../../svg/warn.svg";
import { ReactComponent as Delete } from "../../../svg/delete.svg";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", "get_cart_data");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        setCartData(data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveToCart = async (product) => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", "remove_cart_item");
      param.append("item_id", product?.item_id);

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data.status === 200) {
        fetchCart();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div className="trade-main-body">
          <div className="cart-warn">
            <Warn />
            <p>
              Please check the order—you won’t be able to change it later on.
            </p>
          </div>
          <h1 className="cart-heading">Cart</h1>
          <div className="cart-body">
            <div>
              {cartData?.data?.map((product) => (
                <div className="trade-order-body" key={product?.item_id}>
                  <div className="trade-order-img-block">
                    <img src={product?.item_image} alt="order" />
                  </div>
                  <div className="trade-order-name">
                    <p style={{ color: "#787878" }}>{product?.item_name}</p>
                  </div>
                  <p className="trade-order-status" style={{ color: "#000" }}>
                    {`${product?.item_lot_size} Lots`}
                  </p>
                  <Delete
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveToCart(product)}
                  />
                </div>
              ))}
              <div className="cart-btn">
                <button onClick={() => navigate("/trade-and-win")}>Back</button>
                <button onClick={() => navigate("/shipping")}>Continue</button>
              </div>
            </div>
            <div className="summry-block">
              <p className="summry-head">Summary</p>
              <p className="summry-detail">
                Total Lots : {cartData?.total_added_lots}
              </p>
              <hr className="summry-line" />
              <p className="summry-detail">
                Total Items : {cartData?.cart_items}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
