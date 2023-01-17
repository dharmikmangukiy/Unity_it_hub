import React, { useState, useEffect } from "react";
import "./tradeAndWin.css";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as Star } from "../../../svg/star.svg";
import { Url } from "../../../global";

const TradeAndWin = () => {
  const [tab, setTab] = useState("product");
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [availableLot, setAvailableLot] = useState(null);

  toast.configure();

  useEffect(() => {
    fetchProduct();
    fetchOrder();
    fetchCart();
    fetchAvailableLots();
  }, []);

  const fetchProduct = async () => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", "get_trade_win_products");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        setProductList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrder = async () => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", "order_history");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        setOrderList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (product, action) => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", action);
      param.append("item_id", product.item_id);

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data.status === 200) {
        fetchCart();
        fetchAvailableLots();
        if (data.data.status === "error") {
          toast.error(data.data.message);
        } else {
          toast.success(data.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const fetchAvailableLots = async () => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", "get_available_lots");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.data?.status === "ok") {
        setAvailableLot(data?.data?.available_lots);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <div className="trade-main-body">
              <h1 className="trade-main-heading">
                Traded lots: {availableLot}
              </h1>
              <NavLink to="/prize-lots" className="trade-link">
                WHAT ARE PRIZE LOTS?
              </NavLink>
              <div className="trade-body">
                <div className="trade-tab-button">
                  <button
                    className={tab === "product" ? "active-tab" : ""}
                    onClick={() => setTab("product")}
                  >
                    {`CART: ${cartData?.cart_items} ITEMS, ${cartData?.total_added_lots} LOTS`}
                  </button>
                  <button
                    className={tab === "order" ? "active-tab" : ""}
                    onClick={() => setTab("order")}
                  >
                    ORDER HISTORY
                  </button>
                </div>
                {tab === "product" ? (
                  <div className="trade-product-block">
                    {productList.map((product) => {
                      let isAdded = cartData?.data?.filter(
                        (item) => item.item_id === product.item_id
                      );
                      return (
                        <div
                          className="trade-product-card"
                          key={product?.item_id}
                        >
                          <div
                            onClick={() => {
                              setOpen(true);
                              setProductDetail(product);
                            }}
                          >
                            <div className="product-img-block">
                              <img src={product?.item_image} alt="product" />
                            </div>
                            <h1 className="product-name">
                              {product?.item_name}
                            </h1>
                            <div className="product-lots-block">
                              <p>{`${product?.item_lot_size} lots`}</p>
                              <div>
                                <Star />
                                <p>5</p>
                              </div>
                            </div>
                          </div>
                          <div className="product-add-btn">
                            {isAdded?.length > 0 ? (
                              <button
                                onClick={() =>
                                  handleAddToCart(product, "remove_cart_item")
                                }
                              >
                                REMOVE
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleAddToCart(product, "add_to_cart")
                                }
                              >
                                ADD TO CART
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="trade-order-list">
                    {orderList?.map((order) => (
                      <div className="trade-order-body">
                        <div className="trade-order-img-block">
                          <img src={order?.item_image} alt="order" />
                        </div>
                        <div className="trade-order-name">
                          <p>{order.item_name}</p>
                          <p>{`${order.item_lot_size} lots`}</p>
                        </div>
                        <p className="trade-order-status">Delivered</p>
                        <p className="trade-order-date">01-01-2023</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Dialog
                open={open}
                onClose={() => {
                  setOpen(false);
                  setProductDetail(null);
                }}
                className="product-detail-modal"
              >
                <CloseIcon
                  onClick={() => {
                    setOpen(false);
                    setProductDetail(null);
                  }}
                  className="product-modal-close"
                />
                <div className="product-detail-main">
                  <div className="product-detail-left">
                    <div className="product-img-block">
                      <img src={productDetail?.item_image} alt="product" />
                    </div>
                    <div className="product-sub-img">
                      <div>
                        <img src={productDetail?.item_image} alt="product" />
                      </div>
                      <div>
                        <img src={productDetail?.item_image} alt="product" />
                      </div>
                      <div>
                        <img src={productDetail?.item_image} alt="product" />
                      </div>
                    </div>
                    <h1
                      className="product-name"
                      style={{ marginBottom: "12px" }}
                    >
                      {productDetail?.item_name}
                    </h1>
                    <div className="product-lots-block">
                      <p>{`${productDetail?.item_lot_size} lots`}</p>
                      <div>
                        <Star />
                        <p>5</p>
                      </div>
                    </div>
                    <div className="product-add-btn">
                      {cartData?.data?.filter(
                        (item) => item.item_id === productDetail?.item_id
                      ).length > 0 ? (
                        <button
                          onClick={() =>
                            handleAddToCart(productDetail, "remove_cart_item")
                          }
                        >
                          REMOVE
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddToCart(productDetail, "add_to_cart")
                          }
                        >
                          ADD TO CART
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="product-detail-heading">DESCRIPTION</h1>
                    <hr className="product-detail-hr" />
                    <h6 className="product-detail-description">
                      {productDetail?.item_full_description}
                    </h6>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeAndWin;
