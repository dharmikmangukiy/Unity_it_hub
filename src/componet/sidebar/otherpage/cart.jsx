import React, { useState, useEffect } from "react";
import "./tradeAndWin.css";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { ReactComponent as Warn } from "../../../svg/warn.svg";
import { ReactComponent as Delete } from "../../../svg/delete.svg";
import { useNavigate } from "react-router-dom";
import Toast from "../../commonComponet/Toast";
import { Grid } from "@mui/material";
import { ColorButton } from "../../customComponet/CustomElement";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "get_cart_data");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        setCartData(data?.data);
        setMainLoader(false);
      }
    } catch (err) {}
  };

  const handleRemoveToCart = async (product) => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "remove_cart_item");
      param.append("item_id", product?.item_id);

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data.status === 200) {
        fetchCart();
        if (data.data.status === "error") {
          Toast("error", data.data.message);
        } else {
          Toast("success", data.data.message);
        }
      }
    } catch (err) {}
  };
  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        {mainLoader == true ? (
          <div className="loader1">
            <span className="loader2"></span>
          </div>
        ) : (
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <div className="trade-main-body">
                  <div className="cart-warn">
                    <Warn />
                    <p>
                      Please check the order—you won’t be able to change it
                      later on.
                    </p>
                  </div>
                  <h1 className="cart-heading">Cart</h1>
                  <div className="cart-body">
                    <div>
                      {cartData?.data?.map((product) => (
                        <div
                          className="trade-order-body"
                          key={product?.item_id}
                        >
                          <div className="trade-order-img-block">
                            <img src={product?.item_image} alt="order" />
                          </div>
                          <div className="trade-order-name">
                            <p style={{ color: "#787878" }}>
                              {product?.item_name}
                            </p>
                          </div>
                          <p
                            className="trade-order-status"
                            style={{ color: "#000" }}
                          >
                            {`${product?.item_lot_size} Lots`}
                          </p>
                          <Delete
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveToCart(product)}
                          />
                        </div>
                      ))}
                      {cartData?.data.length == 0 ? (
                        <div className="trade-order-body">Cart Is Empty </div>
                      ) : (
                        ""
                      )}
                      <div className="cart-btn">
                        <button onClick={() => navigate("/trade-and-win")}>
                          Back
                        </button>
                        <ColorButton
                          onClick={() => navigate("/shipping")}
                          disabled={cartData?.data.length == 0 ? true : false}
                        >
                          Continue
                        </ColorButton>
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
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
